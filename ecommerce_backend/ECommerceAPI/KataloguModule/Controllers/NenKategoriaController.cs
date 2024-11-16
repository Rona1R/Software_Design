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
    public class NenKategoriaController : ControllerBase
    {
       
        private readonly INenkategoriaService _nenkategoriaService;

        public NenKategoriaController(INenkategoriaService nenkategoriaService)
        {
            _nenkategoriaService = nenkategoriaService; 
        }

        [HttpPost]
        [Route("shtoNenKategorine")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] NenKategoriaVM nenkategoria)
        {
            try
            {
                await _nenkategoriaService.CreateAsync(nenkategoria);
                return Ok("Nenkategoria u krijua me sukses!");
            }catch(ExistsException ex) {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("shfaqNenKategorite")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _nenkategoriaService.GetAllAsync());
        }

        [HttpGet]
        [Route("shfaqNenKategorine/{id}")]
      //  [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                return Ok(await _nenkategoriaService.GetByIdAsync(id));
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("shfaqNenkategoriseSipasKategorise/{id}")]
        public async Task<IActionResult> GeSipasKategorise(int id)
        {
           return Ok(await _nenkategoriaService.GetByCategoryAsync(id));
        }

        [HttpGet]
        [Route("shfaqSidebarDataPerNenkategorine/{id}")]
        public async Task<IActionResult> GetSideBarData(int id)
        {
             return Ok(await _nenkategoriaService.GetSidebarDataAsync(id));
        }

        [HttpPost]
        [Route("shfaqProduktetSipasNenKategorise/{id}/{sortBy}/{pageNumber}/{pageSize}")]
        public async Task<IActionResult> ShfaqProduktetSipasNenKategorise(int id, string sortBy, int pageNumber, int pageSize,
            [FromBody] FiltersDTO filters
         )
        {
            try
            {
                return Ok(await _nenkategoriaService.GetProductsBySubCategoryAsync(id, sortBy, pageNumber, pageSize, filters));
            }catch(NotFoundException) {
                return NotFound();
            }
        }


        [HttpPut]
        [Route("perditesoNenKategorine/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Put(int id, [FromBody] NenKategoriaVM nenkategoria)
        {
            try
            {
                await _nenkategoriaService.UpdateAsync(id, nenkategoria);   
                return Ok("Nenkategoria u perditesua me sukses!");
            }
            catch (NotFoundException)
            {
                return NotFound();
            }catch(ExistsException e)
            {
                return BadRequest(e.Message);   
            }
        }


        [HttpDelete]
        [Route("FshijNenKategorine/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _nenkategoriaService.DeleteAsync(id);
                return Ok("Nenkategoria u fshi me sukses!");
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }


    }
}
