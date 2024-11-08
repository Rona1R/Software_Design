using ECommerce.Application.OrdersModule.Interfaces;
using ECommerce.Application.OrdersModule.Services;
using ECommerce.Infrastructure.OrdersModule.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace ECommerce.Infrastructure.OrdersModule.DependencyInjection
{
    public static class OrdersServiceRegistration
    {
        public static IServiceCollection RegisterOrdersServices(this IServiceCollection services)
        {

            // mapping with interfaces for Orders Module will be added here

            services.AddScoped<IOrdersRepository, OrdersRepository>();
            services.AddScoped<IOrdersService, OrdersService>();

            return services;
        }
    }
}
