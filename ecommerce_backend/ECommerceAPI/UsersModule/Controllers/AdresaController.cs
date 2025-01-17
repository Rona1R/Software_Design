﻿using ECommerce.Application.UsersModule.Interfaces;
using ECommerce.Application.UsersModule.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.UsersModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdresaController : ControllerBase
    {
        private readonly IAdresaService _adresaService;

        public AdresaController(IAdresaService adresaService)
        {
            _adresaService = adresaService;
        }

        [HttpPost("shtoAdresen")]
        [Authorize]
        public async Task<IActionResult> ShtoAdresen([FromBody] AdresaVM adresaVM)
        {
            try
            {
                await _adresaService.ShtoAdresenAsync(adresaVM);
                return Ok("Adresa juaj eshte shtuar me sukses!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("perditesoAdresen/{adresaId}")]
        [Authorize]
        public async Task<IActionResult> Put(int adresaId, [FromBody] AdresaVM adresaVM)
        {
            await _adresaService.PerditesoAdresenAsync(adresaId, adresaVM);

            return Ok("Adresa juaj eshte perditesuar me sukses!");
        }

        [HttpGet("shfaqAdresen/{adresaId}")]
        [Authorize]
        public async Task<IActionResult> Get(int adresaId)
        {
            var adresa = await _adresaService.GetAdresenSipasIdAsync(adresaId);
            if (adresa == null)
            {
                return NotFound();
            }

            return Ok(adresa);
        }

        [HttpDelete]
        [Route("FshijAdresen/{adresaId}")]
        [Authorize]
        public async Task<IActionResult> Delete(int adresaId)
        {
            await _adresaService.FshijAdresenAsync(adresaId);
            return Ok("Adresa u fshi me sukses!");
        }

        [HttpGet("listoAdresat/{userId}")]
        [Authorize]
        public async Task<IActionResult> ListoAdresat(int userId)
        {
            var adresat = await _adresaService.GetAdresatSipasIdAsync(userId);
            return Ok(adresat);
        }
    }
}
