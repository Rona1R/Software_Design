using ECommerceAPI.Users.API.ViewModels;
using ECommerceAPI.Users.Domain.Entities;

namespace ECommerceAPI.Users.Application.Interfaces
{
    public interface IAdresaService
    {

        Task ShtoAdresenAsync(AdresaVM adresaVM);

        Task PerditesoAdresenAsync(int adresaId, AdresaVM adresaVM);

        Task<Adresa?> GetAdresenSipasIdAsync(int adresaId);

        Task FshijAdresenAsync(int adresaId);

        Task<List<Adresa>> GetAdresatSipasIdAsync(int userId);

    }
}
