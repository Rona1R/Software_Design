using Microsoft.Extensions.DependencyInjection;

namespace ECommerce.Infrastructure.BusinessModule.DependencyInjection
{
    public static class BusinessServiceRegistration
    {
        public static IServiceCollection RegisterBusinessServices(this IServiceCollection services)
        {

            // mapping with interfaces for Business Module will be added here

            return services;
        }
    }
}
