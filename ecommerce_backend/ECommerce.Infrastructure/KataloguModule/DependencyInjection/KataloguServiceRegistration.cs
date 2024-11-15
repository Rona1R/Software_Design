using ECommerce.Application.KataloguModule.Interfaces;
using ECommerce.Application.KataloguModule.Services;
using ECommerce.Infrastructure.KataloguModule.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace ECommerce.Infrastructure.KataloguModule.DependencyInjection
{
    public static class KataloguServiceRegistration
    {
        public static IServiceCollection RegisterKataloguServices(this IServiceCollection services)
        {

            // mapping with interfaces for Katalogu Module will be added here

            services.AddScoped<IKategoriaRepository, KategoriaRepository>();
            services.AddScoped<IKategoriaService, KategoriaService>();

            return services;
        }
    }
}
