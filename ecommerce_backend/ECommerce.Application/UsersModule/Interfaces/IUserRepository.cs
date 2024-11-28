using ECommerce.Application.UsersModule.ViewModels;
using ECommerce.Domain.UsersModule.Entities;
using Microsoft.AspNetCore.Identity;

namespace ECommerce.Application.UsersModule.Interfaces
{
    public interface IUserRepository
    {
        Task<UseriDetajetVM?> GetProfileByIdAsync(int id);

        Task<CheckoutDetails?> GetUserCheckoutDetailsAsync(int id);

        Task<User?> GetUserByIdAsync(int id);

        Task UpdateUsernameAsync(IdentityUser identityuser, string username);

        Task UpdateEmailAsync(IdentityUser identityuser, string newEmail);

        Task UpdatePasswordAsync(IdentityUser identityuser, string password);

        Task UpdateUserPhoneNumberAsync(IdentityUser identityuser, string number);

        Task UpdateProfilePictureAsync(User user, string fileName);

        Task ResetProfilePictureAsync(User user);

        Task UpdateAchievementBadgeAsync(User user, int badgeId);

        Task<int> GetUserCountAsync();

    }
}
