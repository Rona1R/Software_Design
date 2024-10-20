using ECommerceAPI.Users.API.ViewModels;
using ECommerceAPI.Users.Domain.Entities;

namespace ECommerceAPI.Users.Domain.Interfaces
{
    public interface IAdressRepository
    {
        int GetNrAdresave(int userId);

        Task<List<Adresa>> GetAdresatSipasUseritAsync(int userId);


        Task ShtoAdresenAsync(AdresaVM adresaVM);

        Task<Adresa?> GetAdresaSipasIdAsync(int adresaId);

        Task PerditesoAdresenAsync(Adresa adresa, AdresaVM adresaVM);
        Task FshijAdresenAsync(Adresa adresa);
    }
}
