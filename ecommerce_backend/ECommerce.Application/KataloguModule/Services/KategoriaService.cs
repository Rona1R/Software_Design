using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.KataloguModule.DTOs;
using ECommerce.Application.KataloguModule.Interfaces;
using ECommerce.Application.KataloguModule.ViewModels;
using ECommerce.Application.ProduktetModule.DTOs;

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
            await _kategoriaRepository.CreateCategoryAsync(kategoria);
        }

        public async Task<List<KategoriaDTO>> GetAllAsync()
        {
            return await _kategoriaRepository.GetAllAsync();
        }

        public async Task<List<CategoryDTO>> GetKategoriteNenkategoriteAsync()
        {
            return await _kategoriaRepository.GetKategoriteNenkategoriteAsync();
        }
    }
}
