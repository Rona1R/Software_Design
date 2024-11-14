using ECommerce.Application.Exceptions;
using ECommerce.Application.KataloguModule.DTOs;
using ECommerce.Application.KataloguModule.Interfaces;
using ECommerce.Application.KataloguModule.ViewModels;
using ECommerce.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ECommerceAPI.KataloguModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KategoriaController : ControllerBase
    {
        private readonly ECommerceDBContext _context;
        private readonly IKategoriaService _kategoriaService;

        public KategoriaController(ECommerceDBContext context,IKategoriaService kategoriaService)
        {
            _context = context;
            _kategoriaService = kategoriaService;
        }

        [HttpPost]
        [Route("shtoKategorine")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] KategoriaVM kategoria)
        {
            await _kategoriaService.CreateCategoryAsync(kategoria);
            return Ok("Kategoria u shtua me sukses!");
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
            var kategoriaPerTuEdituar = await _context.Kategoria.FirstOrDefaultAsync(x => x.Kategoria_ID == id);

            if (kategoriaPerTuEdituar != null)
            {

                if (!kategoria.Emri.IsNullOrEmpty())
                {
                    kategoriaPerTuEdituar.EmriKategorise = kategoria.Emri;
                }

                if (!kategoria.Pershkrimi.IsNullOrEmpty())
                {
                    kategoriaPerTuEdituar.Pershkrimi = kategoria.Pershkrimi;
                }

                _context.Kategoria.Update(kategoriaPerTuEdituar);
                await _context.SaveChangesAsync();
                return Ok(kategoriaPerTuEdituar);
            }

            return BadRequest("Kjo Kategori nuk ekziston");
        }

        [HttpDelete]
        [Route("FshijKategorine/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            var kategoria = await _context.Kategoria.FirstOrDefaultAsync(k => k.Kategoria_ID == id);
            if (kategoria != null)
            {
                _context.Kategoria.Remove(kategoria);
                await _context.SaveChangesAsync();
                return Ok("Kategoria u fshi me sukses!");
            }

            return BadRequest("Kjo kategori nuk ekziston");
        }
    }

}
