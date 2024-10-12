﻿using ECommerceAPI.Users.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace ECommerceAPI.Users.Domain.Interfaces
{
    public interface IAuthenticationRepository
    {
        Task<IdentityResult> CreateAccount(IdentityUser newUser, string password);

        User? GetByToken(string token);

        Task RemoveToken(User user);

        Task<IdentityUser> GetIdentityUser(int userId);

        // E SHTUAR
        Task<bool> AuthenticateUserAsync(IdentityUser user, string password);

        Task<bool> LogInAsync(string email, string password);

        Task<IdentityUser?> GetUserByEmailAsync(string email);

        Task<IdentityUser?> GetUserByNameAsync(string name);
    }
}
