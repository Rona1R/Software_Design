using ECommerceAPI.Users.Domain.Entities;

namespace ECommerceAPI.Users.Application.Interfaces
{
    public interface IBadgeService
    {
        Task<AchievementBadge?> GetAchievementBadge(int id);

        Task<string> AddBadge(string badgeName);

        Task<List<AchievementBadge>> GetAllBadgesAsync();

        Task UpdateBadge(int id, string name);

        Task DeleteBadge(int id);

    }
}
