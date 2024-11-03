using Microsoft.AspNetCore.Identity;

namespace ECommerce.Application.UsersModule.Interfaces
{
    public interface IUseriRoletService
    {

        Task<IEnumerable<object>> GetAllUsersWithRolesAsync();

        Task<IEnumerable<string>> GetRolesNotAssignedToUserAsync(string userId);

        Task<IEnumerable<string>> GetRolesForDeletionAsync(string userId);

        Task<IdentityResult> AddRoleToIdentityUserAsync(string userId, string roleName);

        Task<IdentityResult> RemoveRoleFromIdentityUserAsync(string userId, string roleName);

        Task<IdentityUser?> GetAspNetUserAsync(string userId);
    }
}
