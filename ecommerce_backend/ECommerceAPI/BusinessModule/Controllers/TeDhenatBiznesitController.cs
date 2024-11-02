using ECommerce.Application.BusinessModule.ViewModels;
using ECommerce.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.BusinessModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeDhenatBiznesitController : ControllerBase
    {
        private readonly ECommerceDBContext _context;

        public TeDhenatBiznesitController(ECommerceDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("getTeDhenat")]
        public IActionResult Get()
        {
            var teDhenat = _context.TeDhenatBiznesit.First();

            return Ok(teDhenat);
        }

        [HttpPut]
        [Route("perditesoTeDhenat")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Put([FromBody] TeDhenatBiznesitVM teDhenat)
        {
            var biznesiData = _context.TeDhenatBiznesit.First();

            biznesiData.EmriBiznesit = teDhenat.EmriBiznesit;
            biznesiData.EmailBiznesit = teDhenat.EmailBiznesit;
            biznesiData.NrKontaktues = teDhenat.NrKontaktit;
            biznesiData.FacebookLink = teDhenat.Facebook;
            biznesiData.TwitterLink = teDhenat.Twitter;
            biznesiData.InstagramLink = teDhenat.Instagram;
            biznesiData.LinkedInLink = teDhenat.LinkedIn;

            await _context.SaveChangesAsync();
            return Ok("Te dhenat e biznesit u perditesuan me sukses!");
        }

    }
}
