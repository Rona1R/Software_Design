using ECommerce.Application.BusinessModule.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceAPI.BusinessModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatistikaController : ControllerBase
    {
        private readonly IStatisticsService _statisticsService;

        public StatistikaController(IStatisticsService statisticsService)
        {
            _statisticsService = statisticsService; 
        }


        [HttpGet("getShifrat")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _statisticsService.GetStatisticsAsync());
        }

        [HttpGet("getSaleStatistics/{viti}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> GetSaleStatistics(int viti)
        {

            return Ok(await _statisticsService.GetYearlySaleStatisticsAsync(viti));
        }

        [HttpGet("getKategoriStatistika")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> GetKategoritStatistika()
        {
            return Ok(await _statisticsService.GetCategoryStatisticsAsync());
        }


        [HttpGet("getMonthlyRevenueStatistics/{viti}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> GetMonthlyRevenue(int viti)
        {
            return Ok(await _statisticsService.GetMonthlyRevenueStatisticsAsync(viti));
        }
    }
}
