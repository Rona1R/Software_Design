using ECommerce.Application.Exceptions;
using ECommerce.Application.KataloguModule.DTOs;
using ECommerce.Application.KataloguModule.Interfaces;
using ECommerce.Application.KataloguModule.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.KataloguModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KategoriaController : ControllerBase
    {
        private readonly IKategoriaService _kategoriaService;

        public KategoriaController(IKategoriaService kategoriaService)
        {
            _kategoriaService = kategoriaService;
        }

        [HttpPost]
        [Route("shtoKategorine")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] KategoriaVM kategoria)
        {
            try
            {
                await _kategoriaService.CreateCategoryAsync(kategoria);
                return Ok("Kategoria u shtua me sukses!");
            }catch(ExistsException ex)
            {
                return BadRequest(ex.Message);  
            }
        }


        [HttpGet]
        [Route("shfaqKategorite")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _kategoriaService.GetAllAsync());
        }

        [HttpGet]
        [Route("shfaqKategoriteDheNenkategorite")]
        public async Task<IActionResult> ShfaqaKategoriteNenkategorite()
        {
            var teDhenat =
                await _kategoriaService.GetKategoriteNenkategoriteAsync();

            return Ok(teDhenat);
        }

        [HttpGet]
        [Route("shaqKategorineSipasID/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                return Ok(await _kategoriaService.GetCategoryByIdAsync(id));    
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("shfaqSidebarDataPerKategorine/{id}")]
        public async Task<IActionResult> GetSideBarData(int id)
        {
            return Ok(await _kategoriaService.GetSidebarDataAsync(id));
        }

        [HttpPost]
        [Route("shfaqProduktetSipasKategorise/{id}/{sortBy}/{pageNumber}/{pageSize}")]
        public async Task<IActionResult> ShfaqProduktetSipasKategorise(int id, string sortBy, int pageNumber, int pageSize, [FromBody] FiltersDTO filters)
        {
            try
            {
                return Ok(await _kategoriaService.GetProductsByCategoryAsync(id,sortBy,pageNumber,pageSize,filters));

            }catch(NotFoundException)
            {

                return NotFound();  
            }
        }



        [HttpPut]
        [Route("perditesoKategorine/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Put(int id, [FromBody] KategoriaVM kategoria)
        {
            try
            {
                await _kategoriaService.UpdateCategoryAsync(id, kategoria); 
                return Ok("Kategoria u perditesua me sukses!");    
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch (ExistsException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        [Route("FshijKategorine/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _kategoriaService.DeleteCategoryAsync(id);
                return Ok();
            }   
            catch (NotFoundException)
            {
                return NotFound();  
            }
        }
    }

}
