using ECommerce.Application.BusinessModule.Interfaces;
using ECommerce.Application.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.BusinessModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeVideoController : ControllerBase
    {
        private readonly IHomeVideoService _homeVideoService;

        public HomeVideoController(IHomeVideoService homeVideoService)
        {
            _homeVideoService = homeVideoService;
        }

        [HttpPost]
        [Route("shtoVideon")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> ShtoVideon(IFormFile video)
        {
            if (video == null || video.Length == 0)
            {
                return BadRequest("Nuk keni vendosur videon!");
            }

            var folder = Path.Combine("..","..","ecommerce-frontend", "public", "videos", video.FileName);

            using (var stream = new FileStream(folder, FileMode.Create))
            {
                await video.CopyToAsync(stream);
            }

            await _homeVideoService.CreateAsync(video.FileName);

            return Ok(video.FileName);
        }

        [HttpGet]
        [Route("getVideot")]
        public async Task<IActionResult> GetVideot()
        {

            return Ok(await _homeVideoService.GetAllAsync());
        }

        [HttpDelete]
        [Route("fshiVideon/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> FshiVideon(int id)
        {
     
            try
            {
                 var video = await _homeVideoService.GetByIdAsync(id);
                 await _homeVideoService.DeleteAsync(video); 

                 var folder = Path.Combine("..","..","ecommerce-frontend", "public", "videos", video.VideoUrl);

                 if (!System.IO.File.Exists(folder))
                 {
                    return NotFound("Video nuk u gjet!");
                 }

                try
                {
                    System.IO.File.Delete(folder);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Ndodhi një gabim gjatë fshirjes së videos: {ex.Message}");
                }

                return Ok($"Video '{video.VideoUrl}' u fshi me sukses.");
            }catch(NotFoundException)
            {

                return NotFound();
            }
  
        }

    }
}
