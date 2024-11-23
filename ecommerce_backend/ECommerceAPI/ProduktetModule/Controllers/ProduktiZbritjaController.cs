using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.Services;
using ECommerce.Infrastructure.Data;
using ECommerceAPI.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.ProduktetModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProduktiZbritjaController : ControllerBase
    {

        private readonly ECommerceDBContext _context;
        private readonly IProduktiZbritjaService _produktService;

        public ProduktiZbritjaController(ECommerceDBContext context, IProduktiZbritjaService produktService)
        {
            _context = context;
            _produktService = produktService;
        }

        [HttpPut]
        [Route("vendosNeZbritje/{produktiId}/{zbritjaId}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> VendosNeZbritje(int produktiId, int zbritjaId)
        {
            try
            {
                var result = await _produktService.VendosNeZbritjeAsync(produktiId, zbritjaId);

                if (result == "Produkti u vendos ne zbritje me sukses!")
                {
                    return Ok(result);
                }

                return BadRequest(result);
            }
            catch (Exception ex)
            {
              
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Gabim i brendshëm!");
            }
        }

        [HttpGet]
        [Route("shfaqProduktinNeZbritje/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var produkti = await _produktService.GetProduktinMeZbritjeAsync(id);

                if (produkti == null)
                {
                    return NotFound("Produkti nuk u gjet ne sistem!");
                }

                return Ok(produkti);
            }
            catch (Exception ex)
            {
        
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Gabim i brendshëm!");
            }
        }

        [HttpPut]
        [Route("largoProduktinNgaZbritja/{produktiId}")]
        [Authorize(Roles = "Admin,Menaxher")]

        public async Task<IActionResult> LargoNgaZbritja(int produktiId)
        {
            var success = await _produktService.RemoveProductNgaZbritjaAsync(produktiId);

            if (!success)
            {
                return BadRequest("Produkti nuk u gjet në sistem!");
            }

            return Ok("Produkti u largua nga zbritja me sukses!");
        }
    
        [HttpPut]
        [Route("perditesoZbritenProduktit/{produktiId}/{zbritjaId}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> PerditesoZbritjenProdukti(int produktiId, int zbritjaId)
        {
            try
            {
         
                var produkti = await _produktService.PerditesoZbritjenProduktiAsync(produktiId, zbritjaId);

              
                return Ok(produkti);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Gabim i brendshëm!");
            }
        }

        [HttpGet]
        [Route("shfaqZbritjetProdukteve")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            var zbritjet = await _context.Produkti
                .Include(z => z.Zbritja)
                .Where(z => z.Zbritja_ID != null)
                .OrderByDescending(z => z.DataVendsojesNeZbritje)
                .Select(pz => new ProduktiZbritjaDTO
                {
                    ProduktiID = pz.Produkti_ID,
                    ZbritjaID = pz.Zbritja_ID,
                    ProduktiEmri = pz.EmriProdukti,
                    CmimiParaZbritjes = pz.CmimiPerCope,
                    CmimiMeZbritje = pz.CmimiPerCope - (decimal)pz.Zbritja.PerqindjaZbritjes / 100 * pz.CmimiPerCope,

                }).ToListAsync();
            return Ok(zbritjet);
        }

        [HttpGet]
        [Route("shfaqProduktetPaZbritje")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> GetProduktet() // Produktet qe nuk kane zbritje per Dropdown
        {
            var paZbritje = await _context.Produkti
              .Where(p => p.Zbritja_ID == null)
              .OrderByDescending(p => p.CreatedAt)
              .Select(p => new
              {
                  ProduktiID = p.Produkti_ID,
                  Emri = p.EmriProdukti
              }).ToListAsync();

            return Ok(paZbritje);
        }
    }
}
