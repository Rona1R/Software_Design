using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.BusinessModule.Interfaces;
using ECommerce.Application.KataloguModule.DTOs;


namespace ECommerce.Application.BusinessModule.Services
{
    public class StatisticsService : IStatisticsService
    {

        private readonly IStatisticsRepository _statisticsRepository;

        public StatisticsService(IStatisticsRepository statisticsRepository)
        {
            _statisticsRepository = statisticsRepository;
        }

        public async Task<object> GetStatisticsAsync()
        {
            return await _statisticsRepository.GetStatisticsAsync();
        }

        public async Task<object> GetYearlySaleStatisticsAsync(int year)
        {
            return await _statisticsRepository.GetYearlySaleStatisticsAsync(year);

        }

        public async Task<object> GetMonthlyRevenueStatisticsAsync(int year)
        {
            return await _statisticsRepository.GetMonthlyRevenueStatisticsAsync(year);
        }

        public async Task<List<CategoryStatisticsDto>> GetCategoryStatisticsAsync()
        {
            return await _statisticsRepository.GetCategoryStatisticsAsync();
        }
    }
}
