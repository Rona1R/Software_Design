using ECommerce.Application.ProduktetModule.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Application.Exceptions;

namespace ECommerceAPI.ProduktetModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProduktiAtributiController : ControllerBase
    {
        private readonly IProduktiAtributiService _produktiAtributiService;
        public ProduktiAtributiController(IProduktiAtributiService produktiAtributiService)
        {
            _produktiAtributiService = produktiAtributiService;

        }

        [HttpPost]
        [Route("add-product-attributes")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] List<ProduktiAttributeVM> atributet)
        {
            
            await _produktiAtributiService.AddProductAttributesAsync(atributet);
            return Ok("Atributet jane shtuar me sukses!");
          
        }

        [HttpGet]
        [Route("get-product-attributes/{produktiId}")]
        public async Task<IActionResult> GetAttr(int produktiId)
        {
            
            var produktiMeAtribute = await _produktiAtributiService.GetProductAttributesAsync(produktiId);

            if (produktiMeAtribute == null)
            {
                return NotFound();
            }
            return Ok(produktiMeAtribute);
        
        }

        [HttpGet]
        [Route("get-available-attributes/{produktiId}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int produktiId)
        {
            var availableAttributes = await _produktiAtributiService.GetAvailableAttributesAsync(produktiId);
            return Ok(availableAttributes);
        }

        [HttpGet]
        [Route("get-product-attribute/{id}")] // te vyn te modal qe ka mu shfaq kur te klikohet mu bo edit atributi i caktuar i ni produkti ,nashta ka me u dasht me bo include Atributi qe me kqyr nbaze te datatype-it qfare field me tu shfaq aty,e kqyr neser ket pjese
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> GetPA(int id)
        {
            var pa = await _produktiAtributiService.GetByIdAsync(id);
            if(pa == null)
            {
                return NotFound();
            }

            return Ok(pa);
        }

        [HttpPut]
        [Route("edit-product-attribute/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Put(int id, [FromBody] ProduktiAttributeVM produktiAtributiVM)
        {
            try
            {
                await _produktiAtributiService.UpdateProductAttributeAsync(id,produktiAtributiVM);
                return Ok("Atributi i ketij produkti u perditesua me sukses!");
            }catch(NotFoundException e)
            {
                return NotFound(e.Message);
            }
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
            catch (NotFoundException ex)
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
