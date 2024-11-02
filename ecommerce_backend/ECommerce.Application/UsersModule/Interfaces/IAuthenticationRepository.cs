using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Domain.UsersModule.Entities;
using Microsoft.AspNetCore.Identity;

namespace ECommerce.Application.UsersModule.Interfaces
{
    public interface IAuthenticationRepository
    {
        Task<IdentityResult> CreateAccountAsync(IdentityUser newUser, string password);

        User? GetByToken(string token);

        Task RemoveTokenAsync(User user);

        Task<IdentityUser> GetIdentityUserAsync(int userId);

        // E SHTUAR
        Task<bool> AuthenticateUserAsync(IdentityUser user, string password);

        Task<bool> LogInAsync(string email, string password);

        Task<IdentityUser?> GetUserByEmailAsync(string email);

        Task<IdentityUser?> GetUserByNameAsync(string name);
    }
}
