using ECommerce.Application.UsersModule.Interfaces;
using ECommerce.Application.UsersModule.ViewModels;
using ECommerce.Domain.UsersModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.UsersModule.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ECommerceDBContext _dbContext;
        private readonly UserManager<IdentityUser> _userManager;

        public UserRepository(
            ECommerceDBContext dbContext,
            UserManager<IdentityUser> userManager
        )
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task<UseriDetajetVM?> GetProfileByIdAsync(int id)
        {

            var user = await _dbContext.User
                .Where(u => u.User_Id == id)
                .Include(u => u.AspNetUser)
                .Include(u => u.AchievementBadge)
                .Select(u => new UseriDetajetVM
                {
                    UserName = u.AspNetUser.UserName!,
                    Email = u.AspNetUser.Email!,
                    PhoneNumber = u.AspNetUser.PhoneNumber,
                    ProfilePicture = u.ProfilePic,
                    BadgeName = u.AchievementBadge != null ? u.AchievementBadge.Badge_Name : "Unavailable",
                    BadgeId = u.AchievementBadge != null ? u.Badge_Id : null,
                })
                .FirstOrDefaultAsync();
            return user;
        }

        public async Task<CheckoutDetails?> GetUserCheckoutDetailsAsync(int id)
        {

            var user = await _dbContext.User
               .Where(u => u.User_Id == id)
               .Select(u => new CheckoutDetails
               {
                   UserName = u.AspNetUser.UserName ?? "Unprovided",
                   Email = u.AspNetUser.Email ?? "Unprovided",
                   PhoneNumber = u.AspNetUser.PhoneNumber,
                   Adresat = u.Adresa.Select(u => new AdresaUserVM
                   {
                       AdresaUserit = u.AdresaUserit,
                       Shteti = u.Shteti,
                       Qyteti = u.Qyteti,
                       ZipKodi = u.ZipKodi,
                       IsDefault = u.IsDefault
                   }
                   ).ToList()

               })
               .FirstOrDefaultAsync();

            return user;
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            var user = await _dbContext.User.Include(u => u.AspNetUser).FirstOrDefaultAsync(u => u.User_Id == id);
            return user;
        }

        public async Task UpdateUsernameAsync(IdentityUser identityuser, string username)
        {
            identityuser.UserName = username;
            await _userManager.UpdateAsync(identityuser);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateEmailAsync(IdentityUser identityuser, string newEmail)
        {
            identityuser.Email = newEmail;
            await _userManager.UpdateAsync(identityuser);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdatePasswordAsync(IdentityUser identityuser, string password)
        {
            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(identityuser);
            await _userManager.ResetPasswordAsync(identityuser, resetToken, password);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateUserPhoneNumberAsync(IdentityUser identityuser, string number)
        {
            identityuser.PhoneNumber = number;
            await _userManager.UpdateAsync(identityuser);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateProfilePictureAsync(User user, string fileName)
        {
            user.ProfilePic = fileName;
            _dbContext.User.Update(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task ResetProfilePictureAsync(User user)
        {
            user.ProfilePic = "defaultProfilePic.png";
            _dbContext.User.Update(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAchievementBadgeAsync(User user, int badgeId)
        {
            user.Badge_Id = badgeId;
            _dbContext.User.Update(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<int> GetUserCountAsync() => await _dbContext.User.CountAsync();

    }
}
