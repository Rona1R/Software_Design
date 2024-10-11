using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerceAPI.Data;
using ECommerceAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using ECommerceAPI.Produktet.Domain.Entities;

namespace ECommerceAPI.Produktet.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProduktiAtributiController : ControllerBase
    {
        private readonly ECommerceDBContext _context;

        public ProduktiAtributiController(ECommerceDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("add-product-attributes")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] List<ProduktiAtributiVM> atributet)
        {

            foreach (var item in atributet)
            {
                var produktiAtributi = new ProduktiAtributi()
                {
                    ProduktiId = item.ProduktiId,
                    AtributiId = item.AtributiId,
                    AtributiValue = item.AtributiValue,
                };

                await _context.ProduktiAtributi.AddAsync(produktiAtributi);
                await _context.SaveChangesAsync();
            }

            return Ok("Atributet jane shtuar me sukses!");
        }

        [HttpGet]
        [Route("get-product-attributes/{produktiId}")]
        public async Task<IActionResult> GetAttr(int produktiId)
        {

            var produktiMeAtribute = await _context.Produkti.Where(p => p.Produkti_ID == produktiId)
                .Select(p => new
                {
                    p.Produkti_ID,
                    p.EmriProdukti,
                    Atributet = p.ProduktiAtributi.Select(pa => new
                    {
                        pa.Id,
                        pa.Atributi.Name,
                        pa.AtributiValue
                    })
                })
                .FirstOrDefaultAsync();
            return Ok(produktiMeAtribute);
        }


        [HttpGet]
        [Route("get-available-attributes/{produktiId}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int produktiId)
        {

            var atributetProduktit = await _context.ProduktiAtributi
                .Where(p => p.ProduktiId == produktiId)
                .Select(p => p.AtributiId)
                .ToListAsync();

            var allAttributes = await _context.Atributi.ToListAsync();

            var availableAttributes = allAttributes
                .Where(a => !atributetProduktit.Contains(a.Id))
                .ToList();

            return Ok(availableAttributes);
        }

        [HttpGet]
        [Route("get-product-attribute/{id}")] // te vyn te modal qe ka mu shfaq kur te klikohet mu bo edit atributi i caktuar i ni produkti ,nashta ka me u dasht me bo include Atributi qe me kqyr nbaze te datatype-it qfare field me tu shfaq aty,e kqyr neser ket pjese
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> GetPA(int id)
        {
            var pa = await _context.ProduktiAtributi.FindAsync(id);
            if (pa == null)
            {
                return BadRequest();
            }

            return Ok(pa);
        }

        [HttpPut]
        [Route("edit-product-attribute/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Put(int id, [FromBody] ProduktiAtributiVM produktiAtributiVM)
        {
            var pa = await _context.ProduktiAtributi.FindAsync(id);
            if (pa == null)
            {
                return BadRequest();
            }

            pa.AtributiValue = produktiAtributiVM.AtributiValue;
            await _context.SaveChangesAsync();

            return Ok("Atributi i produktit u perditesua me sukses!");
        }

        [HttpDelete]
        [Route("remove-product-attribute/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            var pa = await _context.ProduktiAtributi.FindAsync(id);
            _context.ProduktiAtributi.Remove(pa);
            await _context.SaveChangesAsync();
            return Ok("Atributi iu largua Produktit me sukses!");
        }

    }
}
