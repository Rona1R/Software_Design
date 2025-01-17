﻿using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.ProduktetModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZbritjaController : ControllerBase
    {
        private readonly IZbritjaService _zbritjaService;


        public ZbritjaController(IZbritjaService zbritjaService)
        {
            _zbritjaService = zbritjaService;
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
                return Ok(await _zbritjaService.GetZbritjaByIdAsync(id));
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
            try
            {

                await _zbritjaService.RemoveZbritjaAsync(id);
                return Ok("Zbritja u fshi me sukses!");
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }


    }
}
