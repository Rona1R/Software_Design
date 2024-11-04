using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.ProduktetModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProduktiController : ControllerBase
    {
        private readonly IProduktiService _produktiService;

        public ProduktiController(IProduktiService produktiService)
        {
            _produktiService = produktiService; 
        }

        [HttpPost]
        [Route("shtoProduktin")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] ProduktiVM produkti)
        {
            await _produktiService.CreateProductAsync(produkti);
            return Ok("Produkti u shtua me sukses!");
        }

        [HttpPost]
        [Route("shtoFoton")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> ShtoFoton(IFormFile foto)
        {
            if (foto == null || foto.Length == 0)
            {
                return BadRequest("Nuk keni vendosur foton!");
            }

            var folder = Path.Combine("..","..","ecommerce-frontend", "public", "images", foto.FileName);

            using (var stream = new FileStream(folder, FileMode.Create))
            {
                await foto.CopyToAsync(stream);
            }

            return Ok(foto.FileName);
        }


        [HttpGet]   // endpoint per mi shfaq produktet ne dashboard
        [Route("shfaqProduktet")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            var produktet = await _produktiService.GetAllProductsAsync();
            return Ok(produktet);
        }



        [HttpGet] // produkti per mu editu
        [Route("shfaqProduktin/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                return Ok(await _produktiService.GetProductByIdAsync(id));
            }catch(NotFoundException)
            {
                return BadRequest("Ky produkt nuk ekziston");
            }
        }

        [HttpGet]
        [Route("shfaqSidebarDataPerProduktetNeZbritje")]
        public async Task<IActionResult> GetSideBarData()
        {

            return Ok(await _produktiService.GetSidebarDataNeZbritjeAsync());
            
        }


        [HttpPost]
        [Route("shfaqProduktetNeZbritje/{sortBy}/{pageNumber}/{pageSize}")]
        public async Task<IActionResult> ShfaqProduktetSipasNenKategorise(string sortBy, int pageNumber, int pageSize
         , [FromBody] FilterNeZbritjeVM filters
         )
        {
          return Ok(await _produktiService.GetFilteredProducts(sortBy, pageNumber, pageSize, filters));     
        }

        [HttpGet]
        [Route("shfaqDetajetProduktit/{id}")]
        public async Task<IActionResult> ShfaqDetajetProduktit(int id)
        {
            try
            {
                return Ok(await _produktiService.GetProductDetailsByIdAsync(id));   
            }catch(NotFoundException) {
                return NotFound();
            }

        }

        [HttpGet("productsByIds")]
        public async Task<IActionResult> GetProduktetSipasId([FromQuery] List<int> productIds)
        {

            return Ok(await _produktiService.GetProduktetSipasId(productIds));
        }


        [HttpPut]
        [Route("perditesoProduktin/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Put(int id, [FromBody] ProduktiVM produkti)
        {
            try
            {
                await _produktiService.UpdateProductAsync(id, produkti);    
                return Ok("Produkti eshte perditesuar me sukses!");
            }catch(NotFoundException) {
                return BadRequest("Ky produkt nuk eshte gjetur.");
            }
        }

        [HttpGet]
        [Route("shfaq4MeTeShiturat")]
        public async Task<IActionResult> ShfaqMeTeShiturat()
        {
            return Ok(await _produktiService.ShfaqMeTeShiturat());
        }

        [HttpDelete]
        [Route("FshijProduktin/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _produktiService.DeleteProductAsync(id);
                return Ok("Produkti eshte fshire me sukses!");
            }catch(NotFoundException) {
                return BadRequest("Ky produkt nuk ekziston");
            }
        }

    }
}
