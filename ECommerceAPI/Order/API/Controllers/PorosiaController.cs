using ECommerceAPI.Data;
using ECommerceAPI.DTOs;
using ECommerceAPI.Order.Domain.Entities;
using ECommerceAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.Order.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PorosiaController : ControllerBase
    {
        private readonly ECommerceDBContext _context;

        public PorosiaController(ECommerceDBContext context)
        {
            _context = context;
        }

        [HttpPost("validateCart")]
        public async Task<IActionResult> ValidateCart([FromBody] List<CartItemDTO> cartItems)
        {
            var errors = new List<string>();

            foreach (var item in cartItems)
            {

                var ekziston = await _context.Produkti.FirstOrDefaultAsync(p => p.Produkti_ID == item.Id);

                if (ekziston == null)
                {

                    errors.Add($"Product {item.Name} with code {item.Id} does not exist.Please remove it from cart");
                }
                else if (ekziston.SasiaNeStok == 0)
                {
                    errors.Add($"Product {item.Name} with code {item.Id} is currently out of Stock.Please remove it from cart");
                }
                else if (ekziston.SasiaNeStok < item.Sasia)
                {
                    errors.Add($"Available Stock for Product {item.Name} with code {item.Id} is {ekziston.SasiaNeStok}.Please lower the quantity!");
                }
            }


            if (errors.Count == 0)
            {
                return Ok(new { isValid = true });
            }
            else
            {
                return BadRequest(new { isValid = false, errors });
            }

        }

        [HttpPost("shtoPorosine")]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] PorosiaVM porosia)
        {
            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    var porosiaObj = new Porosia()
                    {
                        TotaliProdukteve = porosia.NrProdukteve,
                        CmimiTotal = porosia.CmimiTotal,
                        NrKontaktues = porosia.NrKontaktues,
                        Adresa = porosia.Adresa,
                        Shteti = porosia.Shteti,
                        Qyteti = porosia.Qyteti,
                        ZipKodi = porosia.ZipKodi,
                        UserId = porosia.UserId,
                        MetodaPageses = porosia.MetodaPageses,
                    };

                    await _context.Porosia.AddAsync(porosiaObj);
                    await _context.SaveChangesAsync();

                    foreach (var porosiaItem in porosia.Items)
                    {
                        var item = new PorosiaItem()
                        {
                            SasiaPorositur = porosiaItem.Sasia,
                            Cmimi = porosiaItem.Cmimi, // cmimi te porosia item u vendos se produktit munet mi ndryshu cmimi por ktu duhet mi figuru me ata qe e ka ble
                            Porosia_ID = porosiaObj.Porosia_ID,
                            Produkti_ID = porosiaItem.ProduktiId,
                        };


                        await _context.PorosiaItem.AddAsync(item);

                        var produkti = await _context.Produkti.FirstOrDefaultAsync(p => p.Produkti_ID == porosiaItem.ProduktiId);
                        if (produkti == null)
                        {
                            return BadRequest("Produkti me id " + porosiaItem.ProduktiId + " nuk u gjet ne sistem");
                        }

                        if (produkti.SasiaNeStok < porosiaItem.Sasia)
                        {
                            return BadRequest("Produkti me ID " + porosiaItem.ProduktiId + " ka sasi ne stok " + produkti.SasiaNeStok
                               + ". Kthehu te shporta dhe ule sasine apo largo produktin!"
                             );
                        }

                        produkti.SasiaNeStok -= porosiaItem.Sasia; // Perditesimi i stokut
                    }

                    await _context.SaveChangesAsync();

                    await transaction.CommitAsync();

                    return CreatedAtAction(nameof(Post), new { id = porosiaObj.Porosia_ID }, porosiaObj.Porosia_ID);
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    return StatusCode(500, "An error occurred while processing your request. Please try again.");
                }
            }

        }


        [HttpGet("shfaqFaturenPorosise/{porosiaId}")]
        [Authorize]
        public async Task<IActionResult> ShfaqFaturen(int porosiaId)
        {
            var fatura = await _context.Porosia
                .Where(p => p.Porosia_ID == porosiaId)
                .Select(p => new
                {
                    PorosiaId = p.Porosia_ID,
                    KlientiEmri = p.User.AspNetUser.UserName,
                    p.Adresa,
                    p.Shteti,
                    p.Qyteti,
                    p.ZipKodi,
                    p.NrKontaktues,
                    p.DataPorosise,
                    StatusiPorosise = p.Statusi_Porosise,
                    p.CmimiTotal,
                    Produktet = p.PorosiaItem.Select(pi => new
                    {
                        pi.SasiaPorositur,
                        pi.Cmimi,
                        pi.Produkti.EmriProdukti,
                        pi.Produkti.FotoProduktit,

                    }).ToList(),

                })
                .FirstOrDefaultAsync();
            if (fatura == null)
            {
                return NotFound("Kjo porosi nuk ekziston ne sistem");
            }
            return Ok(fatura);
        }


        [HttpGet("shfaqPorosite")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> ShfaqPorosite()
        {
            var porosite = await
                _context.Porosia
                .OrderByDescending(p => p.DataPorosise)
                .Select(p => new
                {
                    PorosiaID = p.Porosia_ID,
                    KlientiId = p.UserId,
                    Klienti = p.User.AspNetUser.UserName,
                    p.DataPorosise,
                    Totali = p.CmimiTotal,
                    AdresaDerguese = new
                    {
                        p.Adresa,
                        p.Qyteti,
                        p.ZipKodi,
                        p.Shteti
                    },
                    Statusi = p.Statusi_Porosise,
                    p.MetodaPageses,
                    DetajetPorosise = p.PorosiaItem.Select(pi => new
                    {

                        ProduktiID = pi.Produkti_ID,
                        ProduktiEmri = pi.Produkti.EmriProdukti,
                        Foto = pi.Produkti.FotoProduktit,
                        Sasia = pi.SasiaPorositur,
                        pi.Cmimi
                    })

                }).ToListAsync();

            return Ok(porosite);
        }

        [HttpGet("shfaqPorositeSipasPerdoruesit/{userId}")]
        [Authorize]
        public async Task<IActionResult> Get(int userId)
        {
            var porosite = await
                _context.Porosia
                .OrderByDescending(p => p.DataPorosise)
                .Where(p => p.UserId == userId)
                .Select(p => new
                {
                    PorosiaID = p.Porosia_ID,
                    p.DataPorosise,
                    Totali = p.CmimiTotal,
                    p.MetodaPageses,
                    AdresaDerguese = new
                    {
                        p.Adresa,
                        p.Qyteti,
                        p.ZipKodi,
                        p.Shteti
                    },
                    Statusi = p.Statusi_Porosise,

                }).ToListAsync();

            return Ok(porosite);
        }


        [HttpPut("perditesoStatusin/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Put(int id, string statusi)
        {
            var porosia = await _context.Porosia.FindAsync(id);
            if (porosia == null)
            {
                return NotFound();
            }

            porosia.Statusi_Porosise = statusi;
            _context.Update(porosia);
            await _context.SaveChangesAsync();
            return Ok("Statusi i porosise eshte perditesuar me sukses!");
        }

    }
}
