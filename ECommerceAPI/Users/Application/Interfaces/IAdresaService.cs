using ECommerceAPI.Users.API.ViewModels;
using ECommerceAPI.Users.Domain.Entities;

namespace ECommerceAPI.Users.Application.Interfaces
{
    public interface IAdresaService
    {

        Task ShtoAdresen(AdresaVM adresaVM);

        Task PerditesoAdresen(int adresaId, AdresaVM adresaVM);

        Task<Adresa?> GetAdresenSipasId(int adresaId);

        Task FshijAdresen(int adresaId);

        Task<List<Adresa>> GetAdresatSipasId(int userId);

    }
}
