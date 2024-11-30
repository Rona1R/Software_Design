using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Infrastructure.Data;
using ECommerceAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerce.Application.ProduktetModule.ViewModels;

namespace ECommerceAPI.ProduktetModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProduktiAtributiController : ControllerBase
    {
        private readonly ECommerceDBContext _context;
        private readonly IProduktiAtributiService _produktiAtributiService;
        public ProduktiAtributiController(ECommerceDBContext context, IProduktiAtributiService produktiAtributiService)
        {
            _context = context;
            _produktiAtributiService = produktiAtributiService;

        }

        [HttpPost]
        [Route("add-product-attributes")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] List<ProduktiAttributeVM> atributet)
        {
            try
            {
                await _produktiAtributiService.AddProductAttributesAsync(atributet);
                return Ok("Atributet jane shtuar me sukses!");
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = e.Message });
            }
        }

        [HttpGet]
        [Route("get-product-attributes/{produktiId}")]
        public async Task<IActionResult> GetAttr(int produktiId)
        {
            try
            {
                var produktiMeAtribute = await _produktiAtributiService.GetProductAttributesAsync(produktiId);
                return Ok(produktiMeAtribute);
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = e.Message });
            }
        }

        [HttpGet]
        [Route("get-available-attributes/{produktiId}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int produktiId)
        {
            try
            {
                var availableAttributes = await _produktiAtributiService.GetAvailableAttributesAsync(produktiId);
                return Ok(availableAttributes);
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = e.Message });
            }
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
            try
            {
                await _produktiAtributiService.DeleteProduktiAtributiAsync(id);
                return Ok("Atributi iu largua Produktit me sukses!");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
