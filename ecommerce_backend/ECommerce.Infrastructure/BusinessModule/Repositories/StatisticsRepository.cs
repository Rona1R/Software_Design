using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.BusinessModule.Interfaces;
using ECommerce.Application.KataloguModule.DTOs;
using ECommerce.Application.KataloguModule.Interfaces;
using ECommerce.Application.OrdersModule.DTOs;
using ECommerce.Application.OrdersModule.Interfaces;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.UsersModule.Interfaces;

namespace ECommerce.Infrastructure.BusinessModule.Repositories
{
    public class StatisticsRepository : IStatisticsRepository
    {
        private readonly IUserRepository _userRepository;
        private readonly IOrdersRepository _orderRepository;
        private readonly IKategoriaRepository _categoryRepository;
        private readonly IProduktiRepository _productRepository;

        public StatisticsRepository(IUserRepository userRepository, IOrdersRepository orderRepository, IKategoriaRepository categoryRepository, IProduktiRepository productRepository)
        {
            _userRepository = userRepository;
            _orderRepository = orderRepository;
            _categoryRepository = categoryRepository;
            _productRepository = productRepository;
        }

        public async Task<object> GetStatisticsAsync()
        {
            var nrKlienteve = await _userRepository.GetUserCountAsync();
            var nrOrders = await _orderRepository.GetOrderCountAsync();
            var nrKategorive = await _categoryRepository.GetCategoryCountAsync();
            var nrProdukteve = await _productRepository.GetProductCountAsync();
            var revenue = await _orderRepository.GetTotalRevenueAsync();

            DateTime startOfWeek = DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek);
            DateTime endOfWeek = startOfWeek.AddDays(7);

            var ordersThisWeek = await _orderRepository.GetOrdersThisWeekCountAsync(startOfWeek, endOfWeek);

            return new
            {
                nrKlienteve,
                nrOrders,
                ordersThisWeek,
                nrProdukteve,
                nrKategorive,
                revenue
            };
        }

        public async Task<object> GetYearlySaleStatisticsAsync(int year)
        {
            var availableYears = await _orderRepository.GetAvailableYearsAsync();

            int currentYear = DateTime.Now.Year;

            if (!availableYears.Contains(currentYear))
            {
                availableYears.Add(currentYear);
            }
            availableYears.Sort((x, y) => y.CompareTo(x));

            var allMonths = Enumerable.Range(1, 12)
                .Select(m => new OrderMonthStatisticsDTO
                {
                    NumriProdukteve = 0,
                    Month = new DateTime(year, m, 1).ToString("MMM"),
                    MonthNumber = m
                }).ToList();

            var saleStatistics = await _orderRepository.GetSaleStatisticsByYearAsync(year);

            var result = allMonths
                .GroupJoin(saleStatistics,
                    am => am.MonthNumber,
            ss => ss.MonthNumber,
                    (am, ss) => new OrderMonthStatisticsDTO
                    {
                        NumriProdukteve = ss.Sum(s => s.NumriProdukteve),
                        Month = am.Month
                    })
                .ToList();

            return new { availableYears, result };
        }

        public async Task<object> GetMonthlyRevenueStatisticsAsync(int year)
        {
            var availableYears = await _orderRepository.GetAvailableYearsAsync();

            int currentYear = DateTime.Now.Year;
            if (!availableYears.Contains(currentYear))
            {
                availableYears.Add(currentYear);
            }
            availableYears.Sort((x, y) => y.CompareTo(x));

            var allMonths = Enumerable.Range(1, 12)
                .Select(m => new MonthlyRevenueDTO
                {
                    Totali = 0.0m,
                    Month = new DateTime(year, m, 1).ToString("MMM"),
                    MonthNumber = m
                }).ToList();

            var revenueStatistics = await _orderRepository.GetMonthlyRevenueByYearAsync(year);

            var result = allMonths
                .GroupJoin(revenueStatistics,
                    am => am.MonthNumber,
                    rs => rs.MonthNumber,
                    (am, rs) => new MonthlyRevenueDTO
                    {
                        Totali = rs.Sum(r => r.Totali),
                        Month = am.Month
                    })
                .ToList();

            return new { availableYears, result };
        }

        public async Task<List<CategoryStatisticsDto>> GetCategoryStatisticsAsync()
        {
            return await _categoryRepository.GetCategoryStatisticsAsync();
        }

    }
}
