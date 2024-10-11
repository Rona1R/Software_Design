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
    public class AtributiController : ControllerBase
    {
        private readonly ECommerceDBContext _context;

        public AtributiController(ECommerceDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("create-attribute")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] AtributiVM atributiVM)
        {
            var ekziston = await _context.Atributi.FirstOrDefaultAsync(a => a.Name.ToLower() == atributiVM.Name.ToLower());

            if (ekziston != null)
            {
                return BadRequest("Ky atribut ekzsiton! Zgjedh nje emer tjeter!");
            }

            var atr = new Atributi()
            {
                Name = atributiVM.Name,
                DataType = atributiVM.DataType,
            };

            await _context.Atributi.AddAsync(atr);
            await _context.SaveChangesAsync();
            return Ok("Atributi u krijua me sukses!");
        }

        [HttpGet]
        [Route("get-all-atributtes")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            var a = await _context.Atributi.OrderByDescending(a => a.Id).ToListAsync();
            return Ok(a);
        }

        [HttpGet]
        [Route("get-attribute/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int id)
        {
            var atr = await _context.Atributi.FindAsync(id);
            return Ok(atr);
        }

        [HttpPut]
        [Route("edit-attribute/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Put(int id, [FromBody] AtributiVM atributiVM)
        {
            var ekziston = await _context.Atributi.FirstOrDefaultAsync(a => a.Name.ToLower() == atributiVM.Name.ToLower()
            && a.Id != id
            );

            if (ekziston != null)
            {
                return BadRequest("Ky atribut ekzsiton! Zgjedh nje emer tjeter!");
            }

            var atr = await _context.Atributi.FindAsync(id);
            if (atr == null)
            {
                return BadRequest("Atributi nuk u gjet.");
            }

            atr.Name = atributiVM.Name;
            await _context.SaveChangesAsync();
            return Ok("Emri i atributit u perditsua me sukses!");
        }

        [HttpDelete]
        [Route("delete-attribute/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            var atr = await _context.Atributi.FindAsync(id);
            if (atr == null)
            {
                return BadRequest("Atributi nuk u gjet");
            }

            _context.Atributi.Remove(atr);
            await _context.SaveChangesAsync();
            return Ok("Atributi u fshi me sukses");
        }
    }
}
