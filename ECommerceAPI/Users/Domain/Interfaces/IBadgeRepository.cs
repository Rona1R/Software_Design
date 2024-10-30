using ECommerceAPI.Users.Domain.Entities;

namespace ECommerceAPI.Users.Domain.Interfaces
{
    public interface IBadgeRepository
    {
        Task<AchievementBadge?> GetBadge(int id);

        Task<AchievementBadge> GetBadgeByName(string name);

        Task<List<AchievementBadge>> GetAllBadges();
        Task AddNewBadge(string name);

        Task UpdateBadge(AchievementBadge badge, string name);

        Task DeleteBadge(AchievementBadge badge);
    }
}
