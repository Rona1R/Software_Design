using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.ProduktetModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtributiOptionController : ControllerBase
    {

        private readonly IAtributiOptionService _atributiOptionService;

        public AtributiOptionController(IAtributiOptionService atributiOptionService)
        {
            _atributiOptionService = atributiOptionService;
        }

        [HttpPost]
        [Route("add-attribute-option")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] OptionVM option)
        {
            try
            {
                await _atributiOptionService.CreateAsync(option);
                return Ok("Opsioni u shtua me sukses!");
            }
            catch(ExistsException ex)
            {
                return BadRequest(ex.Message);  
            }
        }

        [HttpGet]
        [Route("get-options-sipas-atributit/{atributiId}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> GetOpsionetAll(int atributiId)
        {
            return Ok(await _atributiOptionService.GetOptionsByAtributeAsync(atributiId));
        }

        [HttpGet]
        [Route("get-attribute-option/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                return Ok(await _atributiOptionService.GetByIdAsync(id));
            }catch(NotFoundException) {
                return NotFound();
            }
        }


        [HttpPut]
        [Route("edit-attribute-option/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Put(int id, [FromBody] OptionVM option)
        {
            try
            {
                await _atributiOptionService.UpdateAsync(id, option);
                return Ok("Opsioni u perditesua me sukses!");
            }catch(NotFoundException) {
                return NotFound();
            }catch(ExistsException ex) { 
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("remove-option/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _atributiOptionService.DeleleteOptionAsync(id);
                return Ok("Opsioni u fshi me sukses");
            }catch(NotFoundException) {
                return NotFound();
            }
        }

    }
}
