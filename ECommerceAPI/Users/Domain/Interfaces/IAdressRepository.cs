using ECommerceAPI.Users.API.ViewModels;
using ECommerceAPI.Users.Domain.Entities;

namespace ECommerceAPI.Users.Domain.Interfaces
{
    public interface IAdressRepository
    {
        int GetNrAdresave(int userId);

        Task<List<Adresa>> GetAdresatSipasUserit(int userId);


        Task ShtoAdresen(AdresaVM adresaVM);

        Task<Adresa?> GetAdresaSipasId(int adresaId);

        Task PerditesoAdresen(Adresa adresa, AdresaVM adresaVM);
        Task FshijAdresen(Adresa adresa);
    }
}
