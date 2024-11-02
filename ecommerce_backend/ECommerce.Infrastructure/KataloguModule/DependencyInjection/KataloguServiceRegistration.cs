using Microsoft.Extensions.DependencyInjection;

namespace ECommerce.Infrastructure.KataloguModule.DependencyInjection
{
    public static class KataloguServiceRegistration
    {
        public static IServiceCollection RegisterKataloguServices(this IServiceCollection services)
        {

            // mapping with interfaces for Katalogu Module will be added here

            return services;
        }
    }
}
