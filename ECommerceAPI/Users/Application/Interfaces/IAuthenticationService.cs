using ECommerceAPI.Users.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace ECommerceAPI.Users.Application.Interfaces
{
    public interface IAuthenticationService
    {

        Task<IdentityResult> RegisterUserAsync(string userName, string email,string password); 

        User? RetrieveUserFromToken(string token);  

        Task RemoveUserToken(User user);

        Task<IdentityUser> RetrieveIdentityUser(int userId);

        Task<bool> LogInAsync(string email, string password);

        Task<IdentityUser?> GetUserByEmailAsync(string email);


    }


}
