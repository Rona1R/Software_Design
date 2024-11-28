using ECommerce.Application.BusinessModule.Interfaces;
using ECommerce.Application.BusinessModule.Services;
using ECommerce.Infrastructure.BusinessModule.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace ECommerce.Infrastructure.BusinessModule.DependencyInjection
{
    public static class BusinessServiceRegistration
    {
        public static IServiceCollection RegisterBusinessServices(this IServiceCollection services)
        {

            // mapping with interfaces for Business Module will be added here

            services.AddScoped<IHomeVideoRepository, HomeVideoRepository>();    
            services.AddScoped<IHomeVideoService,HomeVideoService>();


            services.AddScoped<IStatisticsRepository, StatisticsRepository>();
            services.AddScoped<IStatisticsService, StatisticsService>();    

            return services;
        }
    }
}
