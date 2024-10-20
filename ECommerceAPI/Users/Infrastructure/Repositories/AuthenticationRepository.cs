using ECommerceAPI.Data;
using ECommerceAPI.Users.Domain.Entities;
using ECommerceAPI.Users.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.Users.Infrastructure.Repositories
{
    public class AuthenticationRepository:IAuthenticationRepository
    {
        private readonly ECommerceDBContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public AuthenticationRepository(
             UserManager<IdentityUser> userManager,
             ECommerceDBContext dbContext
        )
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task<IdentityResult> CreateAccountAsync(IdentityUser newUser, string password)
        {
            var accountCreation = await _userManager.CreateAsync(newUser, password);
            if (accountCreation.Succeeded)
            {
                await _userManager.AddToRoleAsync(newUser, "User");

                var badgeId = await _dbContext.AchievementBadge.Where(b => b.Badge_Name == "New User").Select(b => b.Badge_Id).FirstOrDefaultAsync();

                User user = new User
                {
                    AspNetUserId = newUser.Id,
                    Badge_Id = badgeId
                };

                await _dbContext.User.AddAsync(user);
                await _dbContext.SaveChangesAsync();
            }

            return accountCreation;
        }

        public User? GetByToken(string token)
        {
            return _dbContext.User?.FirstOrDefault(u => u.RefreshToken == token);
        }

        public async Task RemoveTokenAsync(User user)
        {
            user.RefreshToken = null;
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IdentityUser> GetIdentityUserAsync(int userId)
        {
            var user = await _dbContext.User
                           .Include(u => u.AspNetUser)
                           .FirstOrDefaultAsync(u => u.User_Id == userId);
            return user!.AspNetUser;
        }

        // e shtuar :
        public async Task<bool> AuthenticateUserAsync(IdentityUser identityUser, string password)
        {
            return await _userManager.CheckPasswordAsync(identityUser, password);
        }
        public async Task<bool> LogInAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            return user != null && await AuthenticateUserAsync(user, password);
        }

        public async Task<IdentityUser?> GetUserByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<IdentityUser?> GetUserByNameAsync(string name)
        {
            return await _userManager.FindByNameAsync(name);
        }
    }
}
