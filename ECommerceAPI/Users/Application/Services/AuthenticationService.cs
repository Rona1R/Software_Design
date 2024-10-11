using ECommerceAPI.Users.Domain.Entities;
using ECommerceAPI.Users.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace ECommerceAPI.Users.Application.Services
{
    public class AuthenticationService
    {
        private readonly IAuthenticationRepository _authenticationRepository;

        public AuthenticationService(
           IAuthenticationRepository authRepository
        )
        {
            _authenticationRepository = authRepository;
        }

        public async Task<IdentityResult> RegisterUser(IdentityUser user, string password)
        {
            return await _authenticationRepository.CreateAccount(user, password);
        }

        public User? RetrieveUserFromToken(string token)
        {

            return _authenticationRepository.GetByToken(token);
        }

        public async Task RemoveUserToken(User user)
        {
            await _authenticationRepository.RemoveToken(user);
        }

        public IdentityUser RetrieveIdentityUser(int userId)
        {
            return _authenticationRepository.GetIdentityUser(userId);
        }
    }
}
