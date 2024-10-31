using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ECommerceAPI.Users.Application.Interfaces;

namespace ECommerceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AchievementBadgeController : ControllerBase
    {
        private readonly IBadgeService _badgeService;

        public AchievementBadgeController(IBadgeService badgeService)
        {
            _badgeService = badgeService;
        }

        [HttpPost]
        [Route("shtoBadge/{badgeName}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post(string badgeName)
        {
            try
            {
                var result = await _badgeService.AddBadge(badgeName);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("shfaqBadges")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get()
        {
            var badges = await _badgeService.GetAllBadgesAsync();
            return Ok(badges);
        }

        [HttpGet]
        [Route("shfaqBadgeSipasId/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int id)
        {
            var badge = await _badgeService.GetAchievementBadge(id);
            if (badge == null)
            {
                return BadRequest("Kjo Badge nuk u gjet ne sistem!");
            }

            return Ok(badge);
        }

        [HttpPut]
        [Route("perditesoBadge/{id}/{newName}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Put(int id, string newName)
        {
            try
            {
                await _badgeService.UpdateBadge(id, newName);
                return Ok("Achievement Badge eshte perditesuar me sukses !!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete]
        [Route("fshijBadge/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _badgeService.DeleteBadge(id);
                return Ok("Achievement Badge u fshi me sukses !!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}