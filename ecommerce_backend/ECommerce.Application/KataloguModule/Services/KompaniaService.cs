using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.Exceptions;
using ECommerce.Application.KataloguModule.DTOs;
using ECommerce.Application.KataloguModule.Interfaces;
using ECommerce.Application.KataloguModule.ViewModels;
using ECommerce.Application.ProduktetModule.ViewModels;

namespace ECommerce.Application.KataloguModule.Services
{
    public class KompaniaService : IKompaniaService
    {

        private readonly IKompaniaRepository _repository;

        public KompaniaService(IKompaniaRepository repository)
        {
            _repository = repository;   
        }

        public async Task CreateAsync(KompaniaVM kompania)
        {
            if(await _repository.NameTaken(kompania.Emri)) // validimi
            {
                throw new ExistsException("Ekziston nje kompani me kete emer!");
            }

            await _repository.CreateAsync(kompania);
        }

        public async Task<List<KompaniaDTO>> GetAllAsync()
        {
            return await _repository.GetAllAsync(); 
        }

        public async Task<List<KompaniaDTO>> GetCompaniesAndCategoriesAsync()
        {
            return await _repository.GetCompaniesAndCategoriesAsync();
        }

        public async Task<KompaniaSidebarData> GetSidebarDataAsync(int id)
        {
            return await _repository.GetSidebarDataAsync(id);
        }

        public async Task<KompaniaProduktetResponse> GetProductsByCompanyAsync(int id, string sortBy, int pageNumber, int pageSize, FilterNeZbritjeVM filters)
        {
            if(await _repository.GetByIdAsync(id) == null)
            {
                throw new NotFoundException();
            }

            return await _repository.GetProductsByCompanyAsync(id, sortBy, pageNumber, pageSize, filters);  
        }

        public async Task<KompaniaKategoriaSidebarData> GetSidebarDataAsync(int companyId, int categoryId)
        {
            return await _repository.GetSidebarDataAsync(companyId, categoryId);
        }
    }
}
