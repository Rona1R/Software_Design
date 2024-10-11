using ECommerceAPI.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.Business.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatistikaController : ControllerBase
    {
        private readonly ECommerceDBContext _context;

        public StatistikaController(ECommerceDBContext context)
        {
            _context = context;
        }


        [HttpGet("getShifrat")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            var nrKlienteve = await _context.User.CountAsync();
            var nrOrders = await _context.Porosia.CountAsync();
            var nrKategorive = await _context.Kategoria.CountAsync();
            var nrProdukteve = await _context.Produkti.CountAsync();
            var revenue = await _context.Porosia.SumAsync(p => p.CmimiTotal);

            DateTime startOfWeek = DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek);
            DateTime endOfWeek = startOfWeek.AddDays(7);

            var ordersThisWeek = await _context.Porosia
                .Where(p => p.DataPorosise >= startOfWeek && p.DataPorosise < endOfWeek)
                .CountAsync();

            return Ok(

             new
             {
                 nrKlienteve,
                 nrOrders,
                 ordersThisWeek,
                 nrProdukteve,
                 nrKategorive,
                 revenue

             });
        }

        [HttpGet("getSaleStatistics/{viti}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> GetSaleStatistics(int viti)
        {
            var availableYears = await _context.Porosia
           .Select(o => o.DataPorosise.Year)
           .Distinct()
           .OrderByDescending(year => year)
           .ToListAsync();

            int currentYear = DateTime.Now.Year;

            if (!availableYears.Contains(currentYear))
            {
                availableYears.Add(currentYear);
            }

            var allMonths = Enumerable.Range(1, 12)
              .Select(m => new
              {
                  NumriProdukteve = 0,
                  month = new DateTime(viti, m, 1).ToString("MMM"),
                  monthNumber = m
              }).ToList();

            var saleStatistics = await _context.Porosia
                 .Where(p => p.DataPorosise.Year == viti)
                 .SelectMany(p => p.PorosiaItem)
                 .GroupBy(pi => pi.Porosia.DataPorosise.Month)
                 .Select(p => new
                 {
                     NumriProdukteve = p.Sum(pi => pi.SasiaPorositur),
                     month = new DateTime(viti, p.Key, 1).ToString("MMM"),
                     monthNumber = p.Key
                 }).ToListAsync();

            var result = allMonths
                .GroupJoin(saleStatistics,
                    am => am.monthNumber,
                    ss => ss.monthNumber,
                    (am, ss) => new
                    {
                        NumriProdukteve = ss.Sum(s => s.NumriProdukteve),
                        am.month
                    })
                .ToList();

            return Ok(
               new { availableYears, result }
             );
        }

        [HttpGet("getKategoriStatistika")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> GetKategoritStatistika()
        {

            var kategoriteNrProdukteve = await
                _context.Kategoria
                .Select(k => new
                {
                    Id = k.Kategoria_ID,
                    Value = k.Produkti.Count(),
                    Label = k.EmriKategorise
                }).ToListAsync();

            return Ok(kategoriteNrProdukteve);
        }


        [HttpGet("getMonthlyRevenueStatistics/{viti}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> GetMonthlyRevenue(int viti)
        {
            var availableYears = await _context.Porosia
             .Select(o => o.DataPorosise.Year)
             .Distinct()
             .OrderByDescending(year => year)
             .ToListAsync();

            int currentYear = DateTime.Now.Year;

            if (!availableYears.Contains(currentYear))
            {
                availableYears.Add(currentYear);
            }

            var allMonths = Enumerable.Range(1, 12)
                .Select(m => new
                {
                    Totali = 0.0m,
                    month = new DateTime(viti, m, 1).ToString("MMM"),
                    monthNumber = m
                }).ToList();

            var revenueStatistics = await _context.Porosia
                .Where(p => p.DataPorosise.Year == viti)
                .GroupBy(p => p.DataPorosise.Month)
                .Select(g => new
                {
                    Totali = g.Sum(p => p.CmimiTotal),
                    month = new DateTime(viti, g.Key, 1).ToString("MMM"),
                    monthNumber = g.Key
                }).ToListAsync();

            var result = allMonths
                .GroupJoin(revenueStatistics,
                    am => am.monthNumber,
                    rs => rs.monthNumber,
                    (am, rs) => new
                    {
                        Totali = rs.Sum(r => r.Totali),
                        Month = am.month
                    })
                .ToList();

            return Ok(
                new { availableYears, result }
            );

        }
    }
}
