using ECommerceAPI.Users.Application.Interfaces;
using ECommerceAPI.Users.Domain.Entities;
using ECommerceAPI.Users.Domain.Interfaces;


namespace ECommerceAPI.Users.Application.Services
{
    public class BadgeService : IBadgeService
    {
        private readonly IBadgeRepository _badgeRepository;

        public BadgeService(IBadgeRepository badgeRepository)
        {
            _badgeRepository = badgeRepository;
        }

        public async Task<AchievementBadge?> GetAchievementBadge(int id)
        {
            return await _badgeRepository.GetBadge(id);
        }

        public async Task<string> AddBadge(string badgeName)
        {
            var exists = await _badgeRepository.GetBadgeByName(badgeName);
            if (exists == null)
            {
                await _badgeRepository.AddNewBadge(badgeName);
                return "Badge eshte shtuar me sukses";
            }
            else
            {
                throw new Exception("Ekziston nje Achievement Badge me emer te tille");
            }
        }

        public async Task<List<AchievementBadge>> GetAllBadgesAsync()
        {
            return await _badgeRepository.GetAllBadges();
        }

        public async Task UpdateBadge(int id, string name)
        {
            var badge = await _badgeRepository.GetBadge(id);
            if (badge == null)
            {
                throw new Exception("Kjo badge nuk eshte gjetur ne sistem!");
            }
            var exists = await _badgeRepository.GetBadgeByName(name);
            if (exists != null)
            {
                throw new Exception("Ekziston nje Achievement Badge me emer te tille!");
            }


            await _badgeRepository.UpdateBadge(badge, name);
        }

        public async Task DeleteBadge(int id)
        {
            var badge = await _badgeRepository.GetBadge(id);
            if (badge == null)
            {
                throw new Exception("Kjo badge nuk eshte gjetur ne sistem!");
            }

            await _badgeRepository.DeleteBadge(badge);
        }
    }
}
