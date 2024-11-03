using ECommerce.Application.UsersModule.Interfaces;
using ECommerce.Application.UsersModule.ViewModels;
using ECommerce.Domain.UsersModule.Entities;
using Microsoft.AspNetCore.Identity;

namespace ECommerce.Application.UsersModule.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuthenticationRepository _authenticationRepository;

        public UserService(IUserRepository userRepository, IAuthenticationRepository authenticationRepository)
        {
            _userRepository = userRepository;
            _authenticationRepository = authenticationRepository;
        }

        public async Task<UseriDetajetVM?> GetUserProfileByIdAsync(int id)
        {

            return await _userRepository.GetProfileByIdAsync(id);
        }

        public async Task<CheckoutDetails?> GetUserCheckoutDetailsAsync(int id)
        {
            return await _userRepository.GetUserCheckoutDetailsAsync(id);
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _userRepository.GetUserByIdAsync(id);
        }

        public async Task UpdateUserNameAsync(IdentityUser user, string newUserName)
        {
            var usernameTaken = await _authenticationRepository.GetUserByNameAsync(newUserName);
            if (usernameTaken != null)
            {
                throw new Exception("This username is taken!");
            }
            await _userRepository.UpdateUsernameAsync(user, newUserName);
        }

        public async Task UpdateEmailAsync(IdentityUser user, string newEmail)
        {
            var emailTaken = await _authenticationRepository.GetUserByEmailAsync(newEmail);
            if (emailTaken != null)
            {
                throw new Exception("This Email is taken!");
            }
            await _userRepository.UpdateEmailAsync(user, newEmail);
        }

        public async Task UpdatePasswordAsync(IdentityUser identityuser, string password)
        {
            await _userRepository.UpdatePasswordAsync(identityuser, password);
        }

        public async Task UpdatePhoneNumberAsync(IdentityUser identityuser, string newNumber)
        {
            await _userRepository.UpdateUserPhoneNumberAsync(identityuser, newNumber);
        }

        public async Task UpdateProfilePictureAsync(User user, string fileName)
        {
            await _userRepository.UpdateProfilePictureAsync(user, fileName);
        }

        public async Task ResetProfilePictureAsync(User user)
        {
            await _userRepository.ResetProfilePictureAsync(user);
        }

        public async Task UpdateAchievementBadgeAsync(User user, int badgeId)
        {
            await _userRepository.UpdateAchievementBadgeAsync(user, badgeId);
        }

        public async Task<bool> VerifyOldPasswordAsync(int userId, string oldPassword)
        {
            var identityUser = await _authenticationRepository.GetIdentityUserAsync(userId);
            return await _authenticationRepository.AuthenticateUserAsync(identityUser, oldPassword);
        }
    }
}
