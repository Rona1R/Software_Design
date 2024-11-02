using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.ProduktetModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtributiOptionController : ControllerBase
    {

        private readonly ECommerceDBContext _context;

        public AtributiOptionController(ECommerceDBContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("add-attribute-option")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] OptionVM option)
        {
            var ekziston = await _context.AtributiOption
             .FirstOrDefaultAsync(op => op.AtributiId == option.AtributiId &&
                               op.OptionValue.ToLower() == option.OptionValue.ToLower());

            if (ekziston != null)
            {
                return BadRequest("Ky opsion ekziston per kete atribut!");
            }


            var op = new AtributiOption()
            {
                OptionValue = option.OptionValue,
                AtributiId = option.AtributiId
            };
            await _context.AtributiOption.AddAsync(op);
            await _context.SaveChangesAsync();
            return Ok("Opsioni u shtua me sukses!");
        }

        [HttpGet]
        [Route("get-options-sipas-atributit/{atributiId}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> GetOpsionetAll(int atributiId)
        {
            var at = await _context.AtributiOption.OrderByDescending(a => a.Id)
             .Where(a => a.AtributiId == atributiId).ToListAsync();
            return Ok(at);
        }

        [HttpGet]
        [Route("get-attribute-option/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int id)
        {
            var at = await _context.AtributiOption.FindAsync(id);
            return Ok(at);
        }


        [HttpPut]
        [Route("edit-attribute-option/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Put(int id, [FromBody] OptionVM option)
        {
            var ekziston = await _context.AtributiOption
             .FirstOrDefaultAsync(op => op.AtributiId == option.AtributiId &&
                               op.OptionValue.ToLower() == option.OptionValue.ToLower()
                               && op.Id != id
                               );

            if (ekziston != null)
            {
                return BadRequest("Ky opsion ekziston per kete atribut!");
            }

            var at = await _context.AtributiOption.FindAsync(id);
            if (at == null)
            {
                return NotFound();
            }

            at.OptionValue = option.OptionValue;
            await _context.SaveChangesAsync();
            return Ok("Opsioni u perditesua me sukses!");
        }

        [HttpDelete]
        [Route("remove-option/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            var at = await _context.AtributiOption.FindAsync(id);
            if (at == null)
            {
                return NotFound();
            }

            _context.AtributiOption.Remove(at);
            await _context.SaveChangesAsync();
            return Ok("Opsioni u fshi me sukses!");
        }

    }

    public class OptionVM
    {
        public string OptionValue { get; set; }

        public int AtributiId { get; set; }
    }
}
