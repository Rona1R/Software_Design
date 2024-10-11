using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerceAPI.Data;
using ECommerceAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using ECommerceAPI.Users.Domain.Entities;

namespace ECommerceAPI.Users.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdresaController : ControllerBase
    {
        private readonly ECommerceDBContext _context;

        public AdresaController(ECommerceDBContext context)
        {
            _context = context;
        }

        [HttpPost("shtoAdresen")]
        [Authorize]
        public async Task<IActionResult> ShtoAdresen([FromBody] AdresaVM adresaVM)
        {
            var numriAdresave = await _context.Adresa.Where(a => a.UserId == adresaVM.UserId).CountAsync();
            if (numriAdresave == 3)
            {
                return BadRequest("Numri i adresave qe mund te shtoni eshte maximumi 3!");
            }

            var adresa = new Adresa()
            {
                Shteti = adresaVM.Shteti,
                Qyteti = adresaVM.Qyteti,
                AdresaUserit = adresaVM.Adresa,
                UserId = adresaVM.UserId,
                ZipKodi = adresaVM.ZipKodi,
                IsDefault = adresaVM.IsDefault,
            };

            // nese eshte vendosur qe adresa e re te jete default:
            if (adresaVM.IsDefault)
            {
                var adresat = await _context.Adresa.Where(a => a.UserId == adresaVM.UserId).ToListAsync();
                foreach (var adresaObj in adresat)
                {
                    adresaObj.IsDefault = false;
                }
            }

            await _context.Adresa.AddAsync(adresa);
            await _context.SaveChangesAsync();

            return Ok("Adresa juaj eshte shtuar me sukses!");
        }

        [HttpPut("perditesoAdresen/{adresaId}")]
        [Authorize]
        public async Task<IActionResult> Put(int adresaId, [FromBody] AdresaVM adresaVM)
        {
            var adresa = await _context.Adresa.FindAsync(adresaId);

            if (adresaVM.IsDefault)
            {
                var adresat = await _context.Adresa.Where(a => a.UserId == adresaVM.UserId).ToListAsync();
                foreach (var adresaObj in adresat)
                {
                    adresaObj.IsDefault = false;
                }
            }
            if (adresa != null)
            {
                adresa.Shteti = adresaVM.Shteti;
                adresa.Qyteti = adresaVM.Qyteti;
                adresa.AdresaUserit = adresaVM.Adresa;
                adresa.ZipKodi = adresaVM.ZipKodi;
                adresa.IsDefault = adresaVM.IsDefault;

                _context.Adresa.Update(adresa);
                await _context.SaveChangesAsync();

                return Ok("Adresa juaj eshte perditesuar me sukses!");
            }

            return BadRequest("Kjo adrese nuk u gjet ne sistem!");
        }

        [HttpGet("shfaqAdresen/{adresaId}")]
        [Authorize]
        public async Task<IActionResult> Get(int adresaId)
        {
            var adresa = await _context.Adresa
                .Where(a => a.Adresa_Id == adresaId)
                .Select(a => new
                {
                    a.Adresa_Id,
                    a.AdresaUserit,
                    a.Shteti,
                    a.Qyteti,
                    a.ZipKodi,
                    a.IsDefault,
                    a.UserId,

                }).FirstOrDefaultAsync();

            return Ok(adresa);
        }

        [HttpDelete]
        [Route("FshijAdresen/{adresaId}")]
        [Authorize]
        public async Task<IActionResult> Delete(int adresaId)
        {
            var adresa = await _context.Adresa.FirstOrDefaultAsync(a => a.Adresa_Id == adresaId);
            if (adresa != null)
            {
                _context.Adresa.Remove(adresa);
                await _context.SaveChangesAsync();
                return Ok("Adresa u fshi me sukses!");
            }

            return BadRequest("Kjo adrese nuk ekziston");
        }

        [HttpGet("listoAdresat/{userId}")]
        [Authorize]
        public async Task<IActionResult> ListoAdresat(int userId)
        {
            var adresat = await _context.Adresa
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.CreatedAt)
                .Select(a => new
                {
                    a.Adresa_Id,
                    a.AdresaUserit,
                    a.Shteti,
                    a.Qyteti,
                    a.ZipKodi,
                    a.IsDefault,

                }).ToListAsync();
            return Ok(adresat);
        }
    }
}
