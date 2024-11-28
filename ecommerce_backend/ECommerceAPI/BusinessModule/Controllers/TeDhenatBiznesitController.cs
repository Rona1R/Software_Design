using ECommerce.Application.BusinessModule.Interfaces;
using ECommerce.Application.BusinessModule.ViewModels;
using ECommerce.Application.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.BusinessModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeDhenatBiznesitController : ControllerBase
    {
        private readonly ITeDhenatBiznesitService _service;

        public TeDhenatBiznesitController(ITeDhenatBiznesitService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("getTeDhenat")]
        public IActionResult Get()
        {
            return Ok(_service.Get());
        }

        [HttpPut]
        [Route("perditesoTeDhenat")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Put([FromBody] TeDhenatBiznesitVM teDhenat)
        {
            try
            {
                await _service.UpdateAsync(teDhenat);
                return Ok("Te dhenat e biznesit u perditesuan me sukses!");
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
        }

    }
}
