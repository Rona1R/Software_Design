using Microsoft.AspNetCore.Authorization;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ECommerce.Application.UsersModule.Interfaces;
using ECommerce.Application.UsersModule.ViewModels;

namespace ECommerceAPI.UsersModule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {


        private readonly IUserService _userService;
        private readonly IBadgeService _badgeService;

        public UserController(
         IUserService userService, IBadgeService badgeService
        )
        {
            _userService = userService;
            _badgeService = badgeService;
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

            var user = await _userService.GetUserProfileByIdAsync(id);

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
            var user = await _userService.GetUserCheckoutDetailsAsync(id);

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

            var user = await _userService.GetByIdAsync(id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (string.IsNullOrWhiteSpace(newUsername))
            {
                return BadRequest("Username can not be empty!");
            }


            try
            {
                await _userService.UpdateUserNameAsync(user.AspNetUser, newUsername);
                return Ok("Username u perditesua me sukses!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

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

            var user = await _userService.GetByIdAsync(id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (string.IsNullOrWhiteSpace(newEmail))
            {
                return BadRequest("Email can not be empty!");
            }

            var emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
            if (!Regex.IsMatch(newEmail, emailPattern))
            {
                return BadRequest("Invalid email format.");
            }

            try
            {
                await _userService.UpdateEmailAsync(user.AspNetUser, newEmail);
                return Ok("Email u perditesua me sukses!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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

            var user = await _userService.GetByIdAsync(userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            var verificationResult = await _userService.VerifyOldPasswordAsync(userId, oldPassword);
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

            var user = await _userService.GetByIdAsync(id);

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

            await _userService.UpdatePasswordAsync(user.AspNetUser, newPassword);

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

            var user = await _userService.GetByIdAsync(id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            await _userService.UpdatePhoneNumberAsync(user.AspNetUser, phoneNumberVM.NewPhoneNumber);

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
                var user = await _userService.GetByIdAsync(id);
                if (user == null)
                {
                    return NotFound("User not found.");
                }

                var folder = Path.Combine("..", "..","ecommerce-frontend", "public", "images", foto.FileName);

                using (var stream = new FileStream(folder, FileMode.Create))
                {
                    await foto.CopyToAsync(stream);
                }

                await _userService.UpdateProfilePictureAsync(user, foto.FileName);

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
            var useri = await _userService.GetByIdAsync(id);
            if (useri == null)
            {
                return NotFound();
            }

            await _userService.ResetProfilePictureAsync(useri);
            return Ok("Fotoja eshte resetuar me sukses!");
        }


        [HttpPut]
        [Route("changeAchievementBadge/{userId}/{badgeId}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> ChangeAchievementBadge(int userId, int badgeId)
        {

            var user = await _userService.GetByIdAsync(userId);
            var badge = await _badgeService.GetAchievementBadge(badgeId);
            if (user == null || badge == null)
            {
                return BadRequest("Perditesimi deshtoi.Sigurohu qe ky perdorues dhe kjo badge ekziston ne sistem!");
            }

            await _userService.UpdateAchievementBadgeAsync(user, badgeId);
            return Ok("Perdoruesit i eshte perditesuar Badge me sukses!");
        }
    }
}
