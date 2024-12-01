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

            services.AddScoped<IReviewRepository, ReviewRepository>();  
            services.AddScoped<IReviewService, ReviewService>();    

            services.AddScoped<IWishlistRepository, WishlistRepository>();
            services.AddScoped<IWishlistService, WishlistService>();

            services.AddScoped<IAtributiRepository, AtributiRepository>();
            services.AddScoped<IAtributiService, AtributiService>();


            services.AddScoped<IZbritjaRepository, ZbritjaRepository>();
            services.AddScoped<IZbritjaService, ZbritjaService>();

            services.AddScoped<IProduktiZbritjaRepository, ProduktiZbritjaRepository>();
            services.AddScoped<IProduktiZbritjaService, ProduktiZbritjaService>();

          //  services.AddScoped<IProduktiRepository, ProduktiRepository>();
           // services.AddScoped<IProduktiZbritjaService, ProduktiZbritjaService>();

            services.AddScoped<IProduktiAtributiRepository, ProduktiAtributiRepository>();
            services.AddScoped<IProduktiAtributiService, ProduktiAtributiService>();


            return services;
        }
    }
}
