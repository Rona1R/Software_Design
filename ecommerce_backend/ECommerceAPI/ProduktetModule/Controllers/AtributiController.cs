using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.ProduktetModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtributiController : ControllerBase
    {
        private readonly IAtributiService _atributiService;

        public AtributiController(IAtributiService atributiService)
        {
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
            try
            {
                await _atributiService.UpdateAttributeAsync(id, atributiVM.Name);
                return Ok("Emri i atributit u perditsua me sukses!");
            }
            catch(NotFoundException) {
                return NotFound();
            }catch(AttributeExistsException) {
                return BadRequest("Ky atribut ekzsiton! Zgjedh nje emer tjeter!");
            }

        }

        [HttpDelete]
        [Route("delete-attribute/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {

                await _atributiService.RemoveAttributeAsync(id);
                return Ok("Atributi u fshi me sukses!");
            }catch(NotFoundException) {
                return NotFound();
            }
        }
    }
}
