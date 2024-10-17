using Microsoft.AspNetCore.Mvc;
using ECommerceAPI.Users.Application.Services;
using ECommerceAPI.Users.API.ViewModels;
using ECommerceAPI.Users.Application.Interfaces;

namespace ECommerceAPI.Users.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {

        private readonly TokenService _tokenService;
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController
            (
             TokenService tokenService,
             IAuthenticationService authenticationService
            )
        {
            _tokenService = tokenService;
            _authenticationService = authenticationService;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LogIn model)
        {
            var authenticated = await _authenticationService.LogInAsync(model.Email, model.Password);
            if (authenticated)
            {
                var identityUser = await _authenticationService.GetUserByEmailAsync(model.Email);
                var tokenResponse = await _tokenService.GenerateTokensAsync(identityUser!);
                return Ok(tokenResponse);
            }

            return BadRequest("Your credentials are invalid!");
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] Register register)
        {

            if (ModelState.IsValid)
            {
                try
                {
                    var result = await _authenticationService.RegisterUserAsync(register.Username, register.Email, register.Password);
                    if (result.Succeeded)
                    {
                        return Ok("Your Account was successfully created!");
                    }
                    else
                    {
                        return BadRequest("Something went wrong with Account Creation");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }


            return (BadRequest("Registration input invalid."));
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (!string.IsNullOrEmpty(refreshToken))
            {
                var tokenEntry = _authenticationService.RetrieveUserFromToken(refreshToken);
                if (tokenEntry != null)
                {
                    await _authenticationService.RemoveUserToken(tokenEntry);
                }

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.None,
                    Secure = true,
                    Expires = DateTime.UtcNow.AddDays(-1)
                };
                Response.Cookies.Append("refreshToken", "", cookieOptions);
            }

            return Ok("Logged out successfully.");
        }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return Unauthorized("Refresh token is missing or invalid.");
            }

            var tokenEntry = _authenticationService.RetrieveUserFromToken(refreshToken);
            if (tokenEntry == null)
            {
                return Unauthorized("Invalid or expired refresh token.");
            }

            var identityUser = await _authenticationService.RetrieveIdentityUser(tokenEntry.User_Id);


            var newTokenResponse = await _tokenService.GenerateTokensAsync(identityUser);


            return Ok(newTokenResponse);
        }
    }
}
