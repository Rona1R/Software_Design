using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.KataloguModule.DTOs;

namespace ECommerce.Application.BusinessModule.Interfaces
{
    public interface IStatisticsService
    {
        Task<object> GetStatisticsAsync();

        Task<object> GetYearlySaleStatisticsAsync(int year);

        Task<object> GetMonthlyRevenueStatisticsAsync(int year);

        Task<List<CategoryStatisticsDto>> GetCategoryStatisticsAsync();
    }
}
