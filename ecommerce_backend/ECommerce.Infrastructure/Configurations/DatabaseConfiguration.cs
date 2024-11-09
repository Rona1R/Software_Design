using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ECommerce.Infrastructure.Configurations
{
    public static class DatabaseConfiguration
    {

        public static IServiceCollection AddDbContext(this IServiceCollection services, IConfiguration configuration) 
        {
            services.AddDbContext<ECommerceDBContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("Conn")),
                ServiceLifetime.Scoped);

            return services;
        }
    }
}
