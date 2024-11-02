using ECommerceAPI.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace ECommerceAPI.UsersModule.Security
{
    public class TokenService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ECommerceDBContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _configuration;
        public TokenService(UserManager<IdentityUser> userManager,
            ECommerceDBContext context,
            IHttpContextAccessor httpContextAccessor,
            IConfiguration configuration
            )
        {

            _userManager = userManager;
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
        }
        private async Task<string> GenerateAccessToken(IdentityUser user, IList<string> roles)
        {
            var getUser = await _context.User.FirstOrDefaultAsync(u => u.AspNetUserId == user.Id);


            var claims = new List<Claim>
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, getUser.User_Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JwtConfig:Secret").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(30), // 30 Minuta
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        //Formati i tokenit te dekoduar ne Front , shembull : 
        //{
        //  "sub": "john_doe",
        //  "jti": "123456789",
        //  "nameid": "1234",
        //  "email": "john.doe@example.com",
        //  "roles": ["Admin", "User"],
        //  "exp": 1622487600
        //}
        public async Task<string> GenerateTokensAsync(IdentityUser user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);
            var accessToken = await GenerateAccessToken(user, userRoles);
            var refreshToken = GenerateRefreshToken();

            var getUser = await _context.User.FirstOrDefaultAsync(u => u.AspNetUserId == user.Id);

            if (getUser != null)
            {
                getUser.RefreshToken = refreshToken;
            }
            //await _context.RefreshToken.AddAsync(new RefreshToken
            //{
            //    UserId = getUser.User_Id,
            //    Token = refreshToken,
            //    Expires = DateTime.UtcNow.AddDays(30)
            //});
            await _context.SaveChangesAsync();

            SetRefreshTokenInCookie(refreshToken);  // Set the refresh token in an HttpOnly cookie

            return accessToken;  // Only return the access token
        }

        private void SetRefreshTokenInCookie(string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
                Expires = DateTime.UtcNow.AddDays(30)
            };

            _httpContextAccessor.HttpContext.Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }


        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }



    }
}
