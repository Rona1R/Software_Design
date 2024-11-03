using ECommerce.Application.UsersModule.ViewModels;
using ECommerce.Domain.UsersModule.Entities;
using Microsoft.AspNetCore.Identity;

namespace ECommerce.Application.UsersModule.Interfaces
{
    public interface IUserService
    {
        Task<UseriDetajetVM?> GetUserProfileByIdAsync(int id);

        Task<CheckoutDetails?> GetUserCheckoutDetailsAsync(int id);

        Task<User?> GetByIdAsync(int id);

        Task UpdateUserNameAsync(IdentityUser user, string newUserName);

        Task UpdateEmailAsync(IdentityUser user, string newEmail);

        Task UpdatePasswordAsync(IdentityUser identityuser, string password);

        Task UpdatePhoneNumberAsync(IdentityUser identityuser, string newNumber);

        Task UpdateProfilePictureAsync(User user, string fileName);

        Task ResetProfilePictureAsync(User user);

        Task UpdateAchievementBadgeAsync(User user, int badgeId);

        Task<bool> VerifyOldPasswordAsync(int userId, string oldPassword);
    }
}
