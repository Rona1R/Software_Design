using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.KataloguModule.DTOs;
using ECommerce.Application.KataloguModule.ViewModels;
using ECommerce.Application.ProduktetModule.DTOs;

namespace ECommerce.Application.KataloguModule.Interfaces
{
    public interface IKategoriaService
    {
        Task CreateCategoryAsync(KategoriaVM kategoria);

        Task<List<KategoriaDTO>> GetAllAsync();

        Task<List<CategoryDTO>> GetKategoriteNenkategoriteAsync();

        Task<KategoriaDTO> GetCategoryByIdAsync(int id);

        Task<KategoriaSidebarData> GetSidebarDataAsync(int id);

        Task<ProduktetSipasKategoriseResponse> GetProductsByCategoryAsync(int id, string sortBy, int pageNumber, int pageSize, FiltersDTO filters);

    }
}
