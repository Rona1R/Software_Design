using ECommerceAPI.Users.Application.Interfaces;
using ECommerceAPI.Users.Application.Services;
using ECommerceAPI.Users.Domain.Interfaces;
using ECommerceAPI.Users.Infrastructure.Repositories;

namespace ECommerceAPI.Users.Infrastructure.DependencyInjection
{
    public static class UsersServiceRegistration
    {

            public static IServiceCollection RegisterUsersServices(this IServiceCollection services)
            {
                // Mapping between Interfaces and Repositories 
                services.AddScoped<IAuthenticationRepository, AuthenticationRepository>();
                services.AddScoped<IAuthenticationService, AuthenticationService>();

                // added adresa inter,repo and services
                services.AddScoped<IAdressRepository, AdressRepository>();
                services.AddScoped<IAdresaService, AdresaService>();


                return services;
            }
        }
    
}
