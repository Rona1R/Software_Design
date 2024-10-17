using ECommerceAPI.Users.Application.Interfaces;
using ECommerceAPI.Users.Domain.Entities;
using ECommerceAPI.Users.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace ECommerceAPI.Users.Application.Services
{
    public class AuthenticationService:IAuthenticationService
    {
        private readonly IAuthenticationRepository _authenticationRepository;

        public AuthenticationService(
           IAuthenticationRepository authRepository
        )
        {
            _authenticationRepository = authRepository;
        }

        public async Task<IdentityResult> RegisterUserAsync(string username, string email, string password)
        {
            var ekzistonEmail = await _authenticationRepository.GetUserByEmailAsync(email);
            var ekzistonUsername = await _authenticationRepository.GetUserByNameAsync(username);

            if (ekzistonUsername != null)
            {
                throw new Exception("This Username is taken!");
            }
            if (ekzistonEmail != null)
            {
                throw new Exception("This Email is taken!");
            }


            var newUser = new IdentityUser()
            {
                Email = email,
                UserName = username,
            };
            return await _authenticationRepository.CreateAccount(newUser, password);
        }

        public User? RetrieveUserFromToken(string token)
        {

            return _authenticationRepository.GetByToken(token);
        }

        public async Task RemoveUserToken(User user)
        {
            await _authenticationRepository.RemoveToken(user);
        }

        public async Task<IdentityUser> RetrieveIdentityUser(int userId)
        {
            return await _authenticationRepository.GetIdentityUser(userId);
        }

        // e shtuar:
        public async Task<bool> LogInAsync(string email, string password)
        {
            var credentialsCorrect = await _authenticationRepository.LogInAsync(email, password);
            return credentialsCorrect;
        }

        public async Task<IdentityUser?> GetUserByEmailAsync(string email)
        {
            return await _authenticationRepository.GetUserByEmailAsync(email);
        }
    }
}
