using ECommerce.Application.UsersModule.Interfaces;
using ECommerce.Application.UsersModule.Services;
using ECommerce.Infrastructure.UsersModule.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace ECommerce.Infrastructure.UsersModule.DependencyInjection
{
    public static class UsersServiceRegistration
    {

        public static IServiceCollection RegisterUsersServices(this IServiceCollection services)
        {
            services.AddScoped<IBadgeRepository, BadgeRepository>();
            services.AddScoped<IBadgeService, BadgeService>();

            services.AddScoped<IAdressRepository, AdressRepository>();
            services.AddScoped<IAdresaService, AdresaService>();

            services.AddScoped<IAuthenticationRepository, AuthenticationRepository>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();

            services.AddScoped<IUserRepository, UserRepository>();  
            services.AddScoped<IUserService, UserService>();    

            return services;
        }
    }
}
