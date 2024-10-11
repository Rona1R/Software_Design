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

        public async Task<IdentityResult> CreateAccount(IdentityUser newUser, string password)
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

        public async Task RemoveToken(User user)
        {
            user.RefreshToken = null;
            await _dbContext.SaveChangesAsync();
        }

        public IdentityUser GetIdentityUser(int userId)
        {
            var user = _dbContext.User?
                           .Include(u => u.AspNetUser)
                           .FirstOrDefault(u => u.User_Id == userId);
            return user!.AspNetUser;
        }
    }
}
