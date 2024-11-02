using Microsoft.Extensions.DependencyInjection;

namespace ECommerce.Infrastructure.OrdersModule.DependencyInjection
{
    public static class OrdersServiceRegistration
    {
        public static IServiceCollection RegisterOrdersServices(this IServiceCollection services)
        {

            // mapping with interfaces for Orders Module will be added here

            return services;
        }
    }
}
