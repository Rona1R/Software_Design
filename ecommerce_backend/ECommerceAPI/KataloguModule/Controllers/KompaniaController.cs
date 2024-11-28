using ECommerce.Application.Exceptions;
using ECommerce.Application.KataloguModule.Interfaces;
using ECommerce.Application.KataloguModule.ViewModels;
using ECommerce.Application.ProduktetModule.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.KataloguModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KompaniaController : ControllerBase
    {
        private readonly IKompaniaService _kompaniaService;

        public KompaniaController(IKompaniaService kompaniaService)
        {
            _kompaniaService = kompaniaService; 
        }

        [HttpPost]//Add
        [Route("shtoKompanine")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] KompaniaVM kompania)
        {
            try
            {
                await _kompaniaService.CreateAsync(kompania);
                return Ok("Kompania u shtua me sukses!");
            }catch(ExistsException e)
            {
                return BadRequest(e.Message);
            }

        }

        [HttpGet]//show
        [Route("shfaqKompanine")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _kompaniaService.GetAllAsync());    
        }

        [HttpGet]
        [Route("shfaqKompaniteKategorite")]
        public async Task<IActionResult> ShfaqKompaniteKategorite()
        {
            return Ok(await _kompaniaService.GetCompaniesAndCategoriesAsync()); 
        }

        [HttpGet]
        [Route("shfaqSidebarDataPerKompanine/{id}")]
        public async Task<IActionResult> GetSideBarData(int id)
        {
            return Ok(await _kompaniaService.GetSidebarDataAsync(id));
        }



        [HttpPost]
        [Route("shfaqProduktetSipasKompanise/{id}/{sortBy}/{pageNumber}/{pageSize}")]
        public async Task<IActionResult> ShfaqProduktetSipasNenKategorise(int id, string sortBy, int pageNumber, int pageSize
        , [FromBody] FilterNeZbritjeVM filters
        )
        {
            try
            {
                return Ok(await _kompaniaService.GetProductsByCompanyAsync(id,sortBy,pageNumber,pageSize,filters));
            }
            catch (NotFoundException)
            {
                return NotFound();  
            }
        }

        [HttpGet]
        [Route("getSidebarDataPerKompanineKategorine/{companyId}/{categoryId}")]
        public async Task<IActionResult> GetSidebarData(int companyId, int categoryId)
        {
            return Ok(await _kompaniaService.GetSidebarDataAsync(companyId,categoryId));    
        }


        [HttpPost]
        [Route("shfaqProduktetSipasKompaniseDheKategorise/{companyId}/{categoryId}/{sortBy}/{pageNumber}/{pageSize}")]
        public async Task<IActionResult> ShfaqProduktetSipasKompaniseDheKategorise(int companyId, int categoryId, string sortBy, int pageNumber, int pageSize
         , [FromBody] FilterNeZbritjeVM filters
         )
        {
            try
            {
                return Ok(await _kompaniaService.GetProductsByCompanyCategoryAsync(companyId,categoryId,sortBy,pageNumber,pageSize,filters));   
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }


        [HttpGet]
        [Route("shfaqKompaninesipasID/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                return Ok(await _kompaniaService.GetByIdAsync(id)); 
            }catch(NotFoundException) {
                return NotFound();
            }
        }


        [HttpPut]
        [Route("perditesoKompanine/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]

        public async Task<IActionResult> Put(int id, [FromBody] KompaniaVM kompania)
        {

            try
            {
                await _kompaniaService.UpdateAsync(id, kompania);
                return Ok("Kompania u perditesua me sukses!");

            }catch (NotFoundException) {
                return NotFound();
            }catch(ExistsException ex) {
                return BadRequest(ex.Message);
            }

        }


        [HttpDelete]
        [Route("FshijKompanine/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _kompaniaService.DeleteAsync(id);
                return Ok("Kompania u fshi me sukses!");
            }catch(NotFoundException) {
                return NotFound();
            }

        }
    } 

}
