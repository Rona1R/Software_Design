using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.ViewModels;

namespace ECommerce.Application.ProduktetModule.Interfaces
{
    public interface IProduktiService
    {
        Task CreateProductAsync(ProduktiVM produkti);

        Task<List<ProduktiDTO>> GetAllProductsAsync();

        Task<ProduktiDTO> GetProductByIdAsync(int id);

        Task<SidebarDataNeZbritje> GetSidebarDataNeZbritjeAsync();

        Task<ProductsResponseDTO> GetFilteredProducts(string sortBy, int pageNumber, int pageSize
       , FilterNeZbritjeVM filters);

        Task<DetajetProduktitVM> GetProductDetailsByIdAsync(int id);

        Task<List<CartProductDTO>> GetProduktetSipasId(List<int> productIds);

        Task UpdateProductAsync(int id, ProduktiVM produktiVM);

        Task<List<MeTeShituratDTO>> ShfaqMeTeShiturat();

        Task DeleteProductAsync(int id);
     }
}
