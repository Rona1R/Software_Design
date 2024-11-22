using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Application.ProduktetModule.Interfaces
{
    public interface IProduktiRepository
    {
        Task AddProductAsync(ProduktiVM produkti);

        Task<List<ProduktiDTO>> GetAllProductsAsync();

        Task<Produkti?> GetByIdAsync(int id);


        Task<SidebarDataNeZbritje> GetSidebarDataNeZbritjeAsync();

        Task<ProductsResponseDTO> GetFilteredProducts(string sortBy, int pageNumber, int pageSize
         , FilterNeZbritjeVM filters);


        Task<List<CartProductDTO>> GetProduktetSipasId(List<int> productIds);

        Task UpdateProductAsync(Produkti produktiPerTuEdituar, ProduktiVM produkti);

        Task<List<MeTeShituratDTO>> ShfaqMeTeShiturat();

        Task DeleteProductAsync(Produkti produkti);
    }
}
