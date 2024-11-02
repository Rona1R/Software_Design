using ECommerce.Domain.BusinessModule.Entities;
using ECommerceAPI.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.BusinessModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeVideoController : ControllerBase
    {
        private readonly ECommerceDBContext _context;

        public HomeVideoController(ECommerceDBContext context)
        {
            _context = context;
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

            var folder = Path.Combine("..", "ecommerce-frontend", "public", "videos", video.FileName);

            using (var stream = new FileStream(folder, FileMode.Create))
            {
                await video.CopyToAsync(stream);
            }

            var homeVideo = new HomeVideos()
            {
                VideoUrl = video.FileName,
            };
            await _context.HomeVideos.AddAsync(homeVideo);
            await _context.SaveChangesAsync();

            return Ok(video.FileName);
        }

        [HttpGet]
        [Route("getVideot")]
        public async Task<IActionResult> GetVideot()
        {
            var videot = await _context.HomeVideos.ToListAsync();
            return Ok(videot);
        }

        [HttpDelete]
        [Route("fshiVideon/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> FshiVideon(int id)
        {
            var video = await _context.HomeVideos.FindAsync(id);
            if (video == null)
            {
                return BadRequest("Kjo video nuk u gjet ne sistem!");
            }

            var folder = Path.Combine("..", "ecommerce-frontend", "public", "videos", video.VideoUrl);

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

            _context.HomeVideos.Remove(video);
            await _context.SaveChangesAsync();

            return Ok($"Video '{video.VideoUrl}' u fshi me sukses.");
        }

    }
}
