using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.KataloguModule.DTOs;
using ECommerce.Application.KataloguModule.ViewModels;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.KataloguModule.Entities;

namespace ECommerce.Application.KataloguModule.Interfaces
{
    public interface IKompaniaRepository
    {

        Task<Kompania?> GetByIdAsync(int id);
        Task CreateAsync(KompaniaVM kompania);

        Task<List<KompaniaDTO>> GetAllAsync();

        Task<bool> NameTaken(string name);
        Task<bool> NameTaken(string name, int id);

        Task<List<KompaniaDTO>> GetCompaniesAndCategoriesAsync();
        Task<KompaniaSidebarData> GetSidebarDataAsync(int id);

        Task<KompaniaProduktetResponse> GetProductsByCompanyAsync(int id, string sortBy, int pageNumber, int pageSize, FilterNeZbritjeVM filters);

        Task<KompaniaKategoriaSidebarData> GetSidebarDataAsync(int companyId, int categoryId);

    }
}
