using ECommerce.Application.UsersModule.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace ECommerce.Application.UsersModule.Services
{
    public class UseriRoletService : IUseriRoletService
    {

        private readonly IUserRoletRepository _userRoletRepository;
        private readonly UserManager<IdentityUser> _userManager;

        public UseriRoletService(IUserRoletRepository userRoletRepository, UserManager<IdentityUser> userManager)
        {
            _userRoletRepository = userRoletRepository;
            _userManager = userManager;
        }

        public async Task<IEnumerable<object>> GetAllUsersWithRolesAsync()
        {
            var users = await _userRoletRepository.GetUsersAsync();
            var usersWithRoles = new List<object>();

            foreach (var user in users)
            {
                var aspNetUser = await _userManager.FindByIdAsync(user.AspNetUserId);
                var roles = await _userManager.GetRolesAsync(aspNetUser);

                usersWithRoles.Add(new
                {
                    user.Id,
                    user.AspNetUserId,
                    user.Username,
                    Roli = roles,
                    user.AchievementBadge,
                    user.Email,
                    user.PhoneNumber
                });
            }

            return usersWithRoles;
        }

        public async Task<IEnumerable<string>> GetRolesNotAssignedToUserAsync(string userId)
        {
            var aspNetUser = await _userManager.FindByIdAsync(userId);
            if (aspNetUser == null)
            {
                throw new Exception("Ky perdorues nuk u gjet ne sistem!");
            }

            var userRoles = await _userManager.GetRolesAsync(aspNetUser);
            var allRoles = await _userRoletRepository.GetAllRolesAsync();
            var rolesNotAssigned = allRoles.Except(userRoles).ToList();

            return rolesNotAssigned;
        }

        public async Task<IEnumerable<string>> GetRolesForDeletionAsync(string userId)
        {
            var aspNetUser = await _userManager.FindByIdAsync(userId);
            if (aspNetUser == null)
            {
                throw new Exception("Ky perdorues nuk u gjet ne sistem!");
            }

            var userRoles = await _userManager.GetRolesAsync(aspNetUser);
            var rolesExcludingUser = userRoles.Where(role => role != "User").ToList();

            return rolesExcludingUser;
        }

        public async Task<IdentityResult> AddRoleToIdentityUserAsync(string userId, string roleName)
        {
            return await _userRoletRepository.AddRoleToIdentityUserAsync(userId, roleName);
        }

        public async Task<IdentityResult> RemoveRoleFromIdentityUserAsync(string userId, string roleName)
        {
            return await _userRoletRepository.RemoveRoleFromIdentityUserAsync(userId, roleName);
        }


        public async Task<IdentityUser?> GetAspNetUserAsync(string userId)
        {
            return await _userManager.FindByIdAsync(userId);
        }
    }
}
