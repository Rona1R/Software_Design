using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.KataloguModule.DTOs;
using ECommerce.Application.KataloguModule.ViewModels;
using ECommerce.Application.ProduktetModule.ViewModels;

namespace ECommerce.Application.KataloguModule.Interfaces
{
    public interface IKompaniaService
    {
        Task<KompaniaDTO> GetByIdAsync(int id);
        Task CreateAsync(KompaniaVM kompania);

        Task<List<KompaniaDTO>> GetAllAsync();

        Task<List<KompaniaDTO>> GetCompaniesAndCategoriesAsync();

        Task<KompaniaSidebarData> GetSidebarDataAsync(int id);

        Task<KompaniaProduktetResponse> GetProductsByCompanyAsync(int id, string sortBy, int pageNumber, int pageSize, FilterNeZbritjeVM filters);

        Task<KompaniaKategoriaSidebarData> GetSidebarDataAsync(int companyId, int categoryId);

        Task<KompaniaKategoriaResponse> GetProductsByCompanyCategoryAsync(int companyId, int categoryId, string sortBy, int pageNumber, int pageSize, FilterNeZbritjeVM filters);

        Task UpdateAsync(int id, KompaniaVM kompaniaVM);

        Task DeleteAsync(int id);
    }
}
