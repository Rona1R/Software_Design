using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Domain.UsersModule.Entities;
using Microsoft.AspNetCore.Identity;


namespace ECommerce.Application.UsersModule.Interfaces
{
    public interface IAuthenticationService
    {

        Task<IdentityResult> RegisterUserAsync(string userName, string email, string password);

        User? RetrieveUserFromToken(string token);

        Task RemoveUserTokenAsync(User user);

        Task<IdentityUser> RetrieveIdentityUserAsync(int userId);

        Task<bool> LogInAsync(string email, string password);

        Task<IdentityUser?> GetUserByEmailAsync(string email);


    }

}
