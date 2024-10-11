using ECommerceAPI.Users.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace ECommerceAPI.Users.Domain.Interfaces
{
    public interface IAuthenticationRepository
    {
        Task<IdentityResult> CreateAccount(IdentityUser newUser, string password);

        User? GetByToken(string token);

        Task RemoveToken(User user);

        IdentityUser GetIdentityUser(int userId);
    }
}
