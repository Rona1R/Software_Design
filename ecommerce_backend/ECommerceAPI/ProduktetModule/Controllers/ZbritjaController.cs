using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.Services;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ECommerceAPI.ProduktetModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZbritjaController : ControllerBase
    {
        private readonly IZbritjaService _zbritjaService;

        private readonly ECommerceDBContext _context;

        public ZbritjaController(IZbritjaService zbritjaService, ECommerceDBContext context)
        {
            _zbritjaService = zbritjaService;
            _context = context;
        }

        
        
        [HttpPost]
        [Route("krijoZbritjen")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] ZbritjaVM newZbritja)
        {
            
            await _zbritjaService.PostZbritjaAsync(newZbritja);
            return Ok("Zbritja u shtua me sukses");
        }

        [HttpGet]
        [Route("shfaqZbritjet")] 
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _zbritjaService.GetAllZbritjetAsync());
        }

        [HttpGet]
        [Route("shfaqZbritjen/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                return Ok(await _zbritjaService.GetZbritjaByIdsAsync(id));
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }
        [HttpPut]
        [Route("perditesoZbritjen/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Put(int id, [FromBody] ZbritjaVM zbritja)
        {
            try
            {
                await _zbritjaService.UpdateZbritjaAsync(id, zbritja);
                return Ok("Zbritja eshte perditsuar me sukses!");
            }catch(NotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete]
        [Route("fshijZbritjen/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            var zbritja = await _context.Zbritja.FirstOrDefaultAsync(z => z.Zbritja_ID == id);
            if (zbritja != null)
            {
                _context.Zbritja.Remove(zbritja);
                await _context.SaveChangesAsync();
                return Ok("Zbritja u fshi me sukses!");
            }

            return BadRequest("Kjo zbritje nuk ekziston ne sistem.");
        }


    }
}
