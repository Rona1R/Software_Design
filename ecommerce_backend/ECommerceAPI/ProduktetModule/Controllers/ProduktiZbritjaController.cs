using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace ECommerceAPI.ProduktetModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProduktiZbritjaController : ControllerBase
    {
        private readonly IProduktiZbritjaService _produktService;

        public ProduktiZbritjaController(IProduktiZbritjaService produktService)
        {
            _produktService = produktService;
        }

        [HttpPut]
        [Route("vendosNeZbritje/{produktiId}/{zbritjaId}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> VendosNeZbritje(int produktiId, int zbritjaId)
        {
            try
            {
                await _produktService.VendosNeZbritjeAsync(produktiId, zbritjaId);
                return Ok("Produkti u vendos ne zbritje me sukses!");
            }
            catch(NotFoundException e)
            {
                return NotFound(e.Message); 
            }
            catch (Exception ex)
            {
              
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Gabim i brendshëm!");
            }
        }

        [HttpGet]
        [Route("shfaqProduktinNeZbritje/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var produkti = await _produktService.GetProduktinMeZbritjeAsync(id);
                return Ok(produkti);
            }
            catch(NotFoundException e) {
                return NotFound(e.Message);
            }
            catch (Exception ex)
            {
        
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Gabim i brendshëm!");
            }
        }

        [HttpPut]
        [Route("largoProduktinNgaZbritja/{produktiId}")]
        [Authorize(Roles = "Admin,Menaxher")]

        public async Task<IActionResult> LargoNgaZbritja(int produktiId)
        {
            try
            {
               await _produktService.RemoveProductNgaZbritjaAsync(produktiId);
                return Ok("Produkti u largua nga zbritja me sukses!");

            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }
    
        [HttpPut]
        [Route("perditesoZbritenProduktit/{produktiId}/{zbritjaId}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> PerditesoZbritjenProdukti(int produktiId, int zbritjaId)
        {
            try
            {

                await _produktService.VendosNeZbritjeAsync(produktiId, zbritjaId);
                return Ok("Zbritja e produktit u perditesua me sukses!");

            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Gabim i brendshëm!");
            }
        }
      
        [HttpGet]
        [Route("shfaqZbritjetProdukteve")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            try
            {
             
                var zbritjet = await _produktService.ShfaqZbritjetProdukteveAsync();
                return Ok(zbritjet);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Gabim i brendshëm!");
            }
        }
  
        [HttpGet]
        [Route("shfaqProduktetPaZbritje")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> GetProduktet()
        {
            try
            {
                var paZbritje = await _produktService.ShfaqProduktetPaZbritjeAsync();
                return Ok(paZbritje);
            }
            catch (Exception ex)
            {
              
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Gabim i brendshëm!");
            }
        }
    }
}
