using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.Exceptions;
using ECommerce.Application.KataloguModule.DTOs;
using ECommerce.Application.KataloguModule.Interfaces;
using ECommerce.Application.KataloguModule.ViewModels;

namespace ECommerce.Application.KataloguModule.Services
{
    public class KategoriaService : IKategoriaService
    {

        private readonly IKategoriaRepository _kategoriaRepository;

        public KategoriaService(IKategoriaRepository kategoriaRepository)
        {
            _kategoriaRepository = kategoriaRepository;
        }

        public async Task CreateCategoryAsync(KategoriaVM kategoria)
        {
            if (await _kategoriaRepository.KategoriaEkziston(kategoria.Emri))
            {
                throw new ExistsException("Ekziston nje kategori me emrin e njejte.Zgjedh nje emer tjeter!");
            }
            await _kategoriaRepository.CreateCategoryAsync(kategoria);
        }

        public async Task<List<KategoriaDTO>> GetAllAsync()
        {
            return await _kategoriaRepository.GetAllAsync();
        }

        public async Task<List<KategoriaNenkategoriteDTO>> GetKategoriteNenkategoriteAsync()
        {
            return await _kategoriaRepository.GetKategoriteNenkategoriteAsync();
        }

        public async Task<KategoriaDTO> GetCategoryByIdAsync(int id)
        {
            var kategoria = await _kategoriaRepository.GetCategoryByIdAsync(id);

            if (kategoria == null)
            {
                throw new NotFoundException();
            }

            var kategoriaDto = new KategoriaDTO()
            {
                Id = kategoria.Kategoria_ID,
                Emri = kategoria.EmriKategorise,
                Pershkrimi = kategoria.Pershkrimi,
            };

            return kategoriaDto;
        }

        public async Task<KategoriaSidebarData> GetSidebarDataAsync(int id)
        {
            return await _kategoriaRepository.GetSidebarDataAsync(id);
        }

        public async Task<ProduktetSipasKategoriseResponse> GetProductsByCategoryAsync(int id, string sortBy, int pageNumber, int pageSize, FiltersDTO filters)
        {
            var kategoria = await _kategoriaRepository.GetCategoryByIdAsync(id);

            if (kategoria == null)
            {
                throw new NotFoundException();
            }

            return await _kategoriaRepository.GetProductsByCategoryAsync(id,sortBy, pageNumber, pageSize, filters);  
        }

        public async Task UpdateCategoryAsync(int id,KategoriaVM kategoriaVM)
        {
            var kategoria = await _kategoriaRepository.GetCategoryByIdAsync(id);

            if (kategoria == null)
            {
                throw new NotFoundException();
            }


            // validimi per emer :
            if(await _kategoriaRepository.KategoriaEkziston(id, kategoriaVM.Emri))
            {
                throw new ExistsException("Ekziston nje kategori me kete emer!");
            }

            // validuar me sukses --> update

           await _kategoriaRepository.UpdateCategoryAsync(kategoria, kategoriaVM);   

        }

        public async Task DeleteCategoryAsync(int id)
        {
            var kategoria = await _kategoriaRepository.GetCategoryByIdAsync(id);

            if (kategoria == null)
            {
                throw new NotFoundException();
            }
            
            await _kategoriaRepository.DeleteCategoryAsync(kategoria);
        }
    }

}