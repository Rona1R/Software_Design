using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.KataloguModule.DTOs;
using ECommerce.Application.KataloguModule.ViewModels;
using ECommerce.Domain.KataloguModule.Entities;

namespace ECommerce.Application.KataloguModule.Interfaces
{
    public interface IKategoriaRepository
    {

        Task CreateCategoryAsync(KategoriaVM kategoria);

        Task<List<KategoriaDTO>> GetAllAsync();

        Task<List<KategoriaNenkategoriteDTO>> GetKategoriteNenkategoriteAsync();

        Task<Kategoria?> GetCategoryByIdAsync(int id);

        Task<KategoriaSidebarData> GetSidebarDataAsync(int id);

        Task<ProduktetSipasKategoriseResponse> GetProductsByCategoryAsync(int id, string sortBy, int pageNumber, int pageSize, FiltersDTO filters);

        Task<bool> KategoriaEkziston(string emri);

        Task<bool> KategoriaEkziston(int id, string emri);

        Task UpdateCategoryAsync(Kategoria kategoria, KategoriaVM kategoriaVM);

        Task DeleteCategoryAsync(Kategoria kategoria);
    }
}
