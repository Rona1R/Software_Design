using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.ProduktetModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtributiController : ControllerBase
    {
        private readonly ECommerceDBContext _context;
        private readonly IAtributiService _atributiService;

        public AtributiController(ECommerceDBContext context,IAtributiService atributiService)
        {
            _context = context;
            _atributiService = atributiService; 
        }

        [HttpPost]
        [Route("create-attribute")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] AtributiVM atributiVM)
        {

            try
            {
                await _atributiService.AddAttributeAsync(atributiVM);
                return Ok("Atributi u krijua me sukses!");
            }catch(AttributeExistsException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("get-all-atributtes")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _atributiService.GetAllAsync());
        }

        [HttpGet]
        [Route("get-attribute/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                return Ok(await _atributiService.GetAttributeByIdAsync(id));    
            }catch(NotFoundException) { 
                return NotFound();
            }
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
