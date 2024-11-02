using ECommerceAPI.Data;
using Microsoft.AspNetCore.Authorization;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace ECommerceAPI.UsersModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly ECommerceDBContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public UserController(UserManager<IdentityUser> userManager, ECommerceDBContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        [Route("User-Details/{id}")]
        [Authorize]
        public async Task<IActionResult> GetUserDetails(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid User ID.");
            }

            var user = await _context.User
                .Where(u => u.User_Id == id)
                .Include(u => u.AchievementBadge)
                .Select(u => new
                {
                    u.AspNetUser.UserName,
                    u.AspNetUser.Email,
                    u.AspNetUser.PhoneNumber,
                    ProfilePicture = u.ProfilePic,
                    BadgeName = u.AchievementBadge != null ? u.AchievementBadge.Badge_Name : "Unavailable",
                    BadgeId = u.AchievementBadge != null ? u.Badge_Id : null,
                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
        }

        [HttpGet]
        [Route("User-Checkout-Details/{id}")]
        [Authorize]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _context.User
                .Where(u => u.User_Id == id)
                // .Include(u => u.Adresa)
                .Select(u => new
                {
                    u.AspNetUser.UserName,
                    u.AspNetUser.Email,
                    u.AspNetUser.PhoneNumber,
                    Adresat = u.Adresa.Select(u => new
                    {
                        u.AdresaUserit,
                        u.Shteti,
                        u.Qyteti,
                        u.ZipKodi,
                        u.IsDefault
                    }
                    ).ToList()

                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
        }


        [HttpPut]
        [Route("Update-Username/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateUsername(int id, [FromBody] string newUsername)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid User ID.");
            }

            var user = await _context.User
                .Include(u => u.AspNetUser)
                .FirstOrDefaultAsync(u => u.User_Id == id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (newUsername.IsNullOrEmpty())
            {
                return BadRequest("Username can not be empty!");
            }


            var existingUserByName = await _userManager.FindByNameAsync(newUsername);
            if (existingUserByName != null)
            {
                return BadRequest("This username is taken.");
            }

            user.AspNetUser.UserName = newUsername;

            var result = await _userManager.UpdateAsync(user.AspNetUser);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _context.SaveChangesAsync();

            return Ok("Username updated successfully.");
        }

        [HttpPut]
        [Route("Update-Email/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateEmail(int id, [FromBody] string newEmail)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid User ID.");
            }

            var user = await _context.User
                .Include(u => u.AspNetUser)
                .FirstOrDefaultAsync(u => u.User_Id == id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (newEmail.IsNullOrEmpty())
            {
                return BadRequest("Email can not be empty!");
            }

            var emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
            if (!Regex.IsMatch(newEmail, emailPattern))
            {
                return BadRequest("Invalid email format.");
            }

            var existingUserByEmail = await _userManager.FindByEmailAsync(newEmail);
            if (existingUserByEmail != null)
            {
                return BadRequest("This email is taken.");
            }

            user.AspNetUser.Email = newEmail;

            var result = await _userManager.UpdateAsync(user.AspNetUser);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _context.SaveChangesAsync();

            return Ok("Email updated successfully.");
        }

        [HttpPost]
        [Route("Verify-Old-Password/{userId}")]
        [Authorize]
        public async Task<IActionResult> VerifyOldPassword(int userId, [FromBody] string oldPassword)
        {
            if (userId <= 0)
            {
                return BadRequest("Invalid User ID.");
            }

            var user = await _context.User
                .Include(u => u.AspNetUser)
                .FirstOrDefaultAsync(u => u.User_Id == userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            var aspNetUser = await _userManager.FindByIdAsync(user.AspNetUserId);
            var verificationResult = await _userManager.CheckPasswordAsync(aspNetUser, oldPassword);
            // var passwordHasher = new PasswordHasher<IdentityUser>();
            // var verificationResult = passwordHasher.VerifyHashedPassword(user.AspNetUser, user.AspNetUser.PasswordHash, oldPassword);
            if (verificationResult)
            {
                return Ok(new { isValid = true });
            }
            else
            {
                return Ok(new { isValid = false });
            }
        }

        [HttpPut]
        [Route("Update-Password/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePassword(int id, [FromBody] string newPassword)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid User ID.");
            }

            var user = await _context.User
                .Include(u => u.AspNetUser)
                .FirstOrDefaultAsync(u => u.User_Id == id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (newPassword.IsNullOrEmpty())
            {
                return BadRequest("Passwordi i ri nuk duhet te jete i zbrazet!");
            }

            var passwordPattern = @"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$";
            if (!Regex.IsMatch(newPassword, passwordPattern))
            {
                return BadRequest("Password must be at least 6 characters long,contain at least one digit,one unique,one uppercase,one lowercase and one alphanumeric character.");
            }

            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user.AspNetUser);

            var result = await _userManager.ResetPasswordAsync(user.AspNetUser, resetToken, newPassword);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            //var passwordHasher = new PasswordHasher<IdentityUser>();
            //user.AspNetUser.PasswordHash = passwordHasher.HashPassword(user.AspNetUser, newPassword);

            //var result = await _userManager.UpdateAsync(user.AspNetUser);
            //if (!result.Succeeded)
            //{
            //    return BadRequest(result.Errors);
            //}

            await _context.SaveChangesAsync();

            return Ok("Password updated successfully.");
        }

        [HttpPut]
        [Route("Update-PhoneNumber/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePhoneNumber(int id, [FromBody] PhoneNumberVM phoneNumberVM)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid User ID.");
            }

            var user = await _context.User
                .Include(u => u.AspNetUser)
                .FirstOrDefaultAsync(u => u.User_Id == id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            //if (newPhoneNumber.IsNullOrEmpty())
            //{
            //    return BadRequest("Numri i telefonit nuk duhet te jete i zbrazet!");
            //}

            user.AspNetUser.PhoneNumber = phoneNumberVM.NewPhoneNumber;

            var result = await _userManager.UpdateAsync(user.AspNetUser);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _context.SaveChangesAsync();

            return Ok("Phone number updated successfully.");
        }


        [HttpPut]
        [Route("Update-ProfilePicture/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateProfilePicture(int id, IFormFile foto)
        {
            if (foto == null || foto.Length == 0)
            {
                return BadRequest("No photo provided.");
            }

            try
            {
                var user = await _context.User.FirstOrDefaultAsync(u => u.User_Id == id);
                if (user == null)
                {
                    return NotFound("User not found.");
                }

                if (foto == null || foto.Length == 0)
                {
                    return BadRequest("Nuk keni vendosur foton!");
                }

                var folder = Path.Combine("..", "ecommerce-frontend", "public", "images", foto.FileName);

                using (var stream = new FileStream(folder, FileMode.Create))
                {
                    await foto.CopyToAsync(stream);
                }

                user.ProfilePic = foto.FileName;
                _context.User.Update(user);
                await _context.SaveChangesAsync();
                return Ok("Fotoja eshte perditesuar me sukses");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut]
        [Route("Reset-Profile-Pic/{id}")]
        [Authorize]
        public async Task<IActionResult> ResetProfilePic(int id)
        {
            var useri = await _context.User.FindAsync(id);
            if (useri == null)
            {
                return NotFound();
            }

            useri.ProfilePic = "defaultProfilePic.png";
            _context.User.Update(useri);
            await _context.SaveChangesAsync();
            return Ok("Fotoja eshte resetuar me sukses!");


        }


        [HttpPut]
        [Route("changeAchievementBadge/{userId}/{badgeId}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> ChangeAchievementBadge(int userId, int badgeId)
        {
            var user = await _context.User.FindAsync(userId);
            var badge = await _context.AchievementBadge.FindAsync(badgeId);
            if (user == null || badge == null)
            {
                return BadRequest("Perditesimi deshtoi.Sigurohu qe ky perdorues dhe kjo badge ekziston ne sistem!");
            }

            user.Badge_Id = badgeId;
            _context.User.Update(user);
            await _context.SaveChangesAsync();
            return Ok("Perdoruesit i eshte perditesuar Badge me sukses!");

        }
    }
    public class PhoneNumberVM
    {
        public string? NewPhoneNumber { get; set; }
    }
}
