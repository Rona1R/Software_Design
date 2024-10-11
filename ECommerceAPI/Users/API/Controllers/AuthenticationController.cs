using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerceAPI.Users.Application.Services;
using ECommerceAPI.Users.API.ViewModels;

namespace ECommerceAPI.Users.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {

        private readonly UserManager<IdentityUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly AuthenticationService _authenticationService;

        public AuthenticationController
            (UserManager<IdentityUser> userManager,
             TokenService tokenService,
             AuthenticationService authenticationService
            )
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _authenticationService = authenticationService;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LogIn model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {

                var tokenResponse = await _tokenService.GenerateTokensAsync(user);
                return Ok(tokenResponse);
            }
            return BadRequest("Invalid email or password.");
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] Register register)
        {

            if (ModelState.IsValid)
            {
                var ekzistonEmail = await _userManager.FindByEmailAsync(register.Email);
                var ekzistonUsername = await _userManager.FindByNameAsync(register.Username);

                if (ekzistonEmail == null && ekzistonUsername == null)
                {
                    var newUser = new IdentityUser()
                    {
                        Email = register.Email,
                        UserName = register.Username,
                    };

                    var result = await _authenticationService.RegisterUser(newUser, register.Password);
                    if (result.Succeeded)
                    {
                        return Ok("Your Account was successfully created!");
                    }
                    else
                    {
                        return BadRequest("Something went wrong with Account Creation");
                    }
                }
                else if (ekzistonUsername != null)
                {

                    return BadRequest("This username is taken");
                }
                else if (ekzistonEmail != null)
                {
                    return BadRequest("Email is taken");
                }
                else
                {
                    return BadRequest("Username and email are taken.");
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

            var identityUser = _authenticationService.RetrieveIdentityUser(tokenEntry.User_Id);


            var newTokenResponse = await _tokenService.GenerateTokensAsync(identityUser);


            return Ok(newTokenResponse);
        }
    }
}
