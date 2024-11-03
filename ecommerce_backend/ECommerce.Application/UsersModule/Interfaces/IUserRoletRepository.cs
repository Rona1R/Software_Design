using ECommerce.Application.UsersModule.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace ECommerce.Application.UsersModule.Interfaces
{
    public interface IUserRoletRepository
    {
        Task<List<UsersVM>> GetUsersAsync();

        Task<List<string>> GetAllRolesAsync();

        Task<IdentityResult> AddRoleToIdentityUserAsync(string identityId, string roleName);

        Task<IdentityResult> RemoveRoleFromIdentityUserAsync(string identityId, string roleName);
    }
}
