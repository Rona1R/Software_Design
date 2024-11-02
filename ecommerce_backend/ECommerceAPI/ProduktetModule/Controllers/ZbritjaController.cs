using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Infrastructure.Data;
using ECommerceAPI.ProduktetModule.API.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ECommerceAPI.ProduktetModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZbritjaController : ControllerBase
    {
        private readonly ECommerceDBContext _context;

        public ZbritjaController(ECommerceDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("krijoZbritjen")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] ZbritjaVM zbritja)
        {
            var z = new Zbritja()
            {
                ZbritjaEmri = zbritja.ZbritjaEmri,
                PerqindjaZbritjes = zbritja.PerqindjaZbritjes,
                DataSkadimit = zbritja.DataSkadimit,
            };

            await _context.Zbritja.AddAsync(z);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Post), new { id = z.Zbritja_ID }, z);
        }

        [HttpGet]
        [Route("shfaqZbritjet")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            var zbritjet = await _context.Zbritja
                .OrderByDescending(z => z.DataKrijimit)
                .Select(z => new
                {
                    z.Zbritja_ID,
                    z.ZbritjaEmri,
                    z.PerqindjaZbritjes,
                    dataKrijimit = z.DataKrijimit,
                    dataSkadimit = z.DataSkadimit,
                }).ToListAsync();
            return Ok(zbritjet);
        }

        [HttpGet]
        [Route("shfaqZbritjen/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int id)
        {
            var zbritja = await _context.Zbritja
                .Where(z => z.Zbritja_ID == id)
                .OrderByDescending(z => z.DataKrijimit)
                .Select(z => new
                {
                    z.Zbritja_ID,
                    z.ZbritjaEmri,
                    z.PerqindjaZbritjes,
                    z.DataKrijimit,
                    z.DataSkadimit,

                }).FirstOrDefaultAsync();

            if (zbritja == null)
            {
                return BadRequest("Zbritja nuk u gjet ne sistem.");
            }

            return Ok(zbritja);
        }
        [HttpPut]
        [Route("perditesoZbritjen/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Put(int id, [FromBody] ZbritjaVM zbritja)
        {
            var zbritjaPerTuEdituar = await _context.Zbritja.FirstOrDefaultAsync(x => x.Zbritja_ID == id);

            if (zbritjaPerTuEdituar != null)
            {

                if (!zbritja.ZbritjaEmri.IsNullOrEmpty())
                {
                    zbritjaPerTuEdituar.ZbritjaEmri = zbritja.ZbritjaEmri;
                }


                zbritjaPerTuEdituar.PerqindjaZbritjes = zbritja.PerqindjaZbritjes;

                zbritjaPerTuEdituar.DataSkadimit = zbritja.DataSkadimit;


                _context.Zbritja.Update(zbritjaPerTuEdituar);
                await _context.SaveChangesAsync();
                return Ok(zbritjaPerTuEdituar);
            }

            return BadRequest("Kjo Zbritje nuk ekziston");
        }

        [HttpDelete]
        [Route("fshijZbritjen/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            var zbritja = await _context.Zbritja.FirstOrDefaultAsync(z => z.Zbritja_ID == id);
            if (zbritja != null)
            {
                _context.Zbritja.Remove(zbritja);
                await _context.SaveChangesAsync();
                return Ok("Zbritja u fshi me sukses!");
            }

            return BadRequest("Kjo zbritje nuk ekziston ne sistem.");
        }

    }
}
