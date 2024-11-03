using ECommerce.Application.UsersModule.Interfaces;
using ECommerce.Application.UsersModule.ViewModels;
using ECommerce.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.UsersModule.Repositories
{
    public class UseriRoletRepository : IUserRoletRepository
    {
        private readonly ECommerceDBContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public UseriRoletRepository(
          ECommerceDBContext dbContext,
          UserManager<IdentityUser> userManager
        )
        {
            _context = dbContext;
            _userManager = userManager;
        }

        public async Task<List<UsersVM>> GetUsersAsync()
        {
            return await _context.User
                .Select(u => new UsersVM
                {
                    Id = u.User_Id,
                    Username = u.AspNetUser.UserName,
                    AspNetUserId = u.AspNetUserId,
                    AchievementBadge = u.AchievementBadge != null ? u.AchievementBadge.Badge_Name : "Unavailable",
                    Email = u.AspNetUser.Email,
                    PhoneNumber = u.AspNetUser.PhoneNumber ?? "Not Provided"
                })
                .ToListAsync();
        }

        public async Task<List<string>> GetAllRolesAsync()
        {
            return await _context.Roles.Select(r => r.Name).ToListAsync();
        }

        public async Task<IdentityResult> AddRoleToIdentityUserAsync(string identityId, string roleName)
        {
            var identityUser = await _userManager.FindByIdAsync(identityId);
            var shtimiRolit = await _userManager.AddToRoleAsync(identityUser!, roleName);
            return shtimiRolit;
        }

        public async Task<IdentityResult> RemoveRoleFromIdentityUserAsync(string identityId, string roleName)
        {
            var identityUser = await _userManager.FindByIdAsync(identityId);
            var shtimiRolit = await _userManager.RemoveFromRoleAsync(identityUser!, roleName);
            return shtimiRolit;
        }
    }
}
