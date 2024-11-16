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
    public interface INenkategoriaRepository
    {

        Task<NenKategoria?> GetByIdAsync(int id);

        Task CreateAsync(NenKategoriaVM nenkategoria);

        Task<List<NenKategoriaDTO>> GetAllAsync();

        Task<List<NenKategoriaDTO>> GetByCategoryAsync(int id);

        Task<bool> NenkategoriaEkziston(string emri);

        Task<bool> NenkategoriaEkziston(string emri, int id);

        Task<KategoriaSidebarData> GetSidebarDataAsync(int id);

        Task<ProduktetSipasNenkategorise> GetProductsBySubCategoryAsync(int id, string sortBy, int pageNumber, int pageSize, FiltersDTO filters);

        Task UpdateAsync(NenKategoria n, NenKategoriaVM nenkategoria);

        Task DeleteAsync(NenKategoria nenkategoria);
    }
}
