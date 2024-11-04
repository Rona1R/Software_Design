using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.Services;
using ECommerce.Infrastructure.ProduktetModule.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace ECommerce.Infrastructure.ProduktetModule.DependencyInjection
{
    public static class ProduktetServiceRegistration
    {
        public static IServiceCollection RegisterProduktetServices(this IServiceCollection services)
        {

            // mapping with interfaces for Products Module will be added here

            services.AddScoped<IProduktiRepository, ProduktiRepository>();
            services.AddScoped<IProduktiService,ProduktiService>();

            return services;
        }
    }
}
