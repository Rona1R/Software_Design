using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Application.ProduktetModule.Interfaces;


namespace ECommerce.Application.ProduktetModule.Services
{
    public class ProduktiAtributiService : IProduktiAtributiService
    {
        private readonly IProduktiAtributiRepository _produktiAtributiRepository;

        public ProduktiAtributiService(IProduktiAtributiRepository produktiAtributiRepository)
        {
            _produktiAtributiRepository = produktiAtributiRepository;
        }
        public async Task AddProductAttributesAsync(List<ProduktiAttributeVM> produktiAtributetVM)
        {
            var produktiAtributet = produktiAtributetVM.Select(item => new ProduktiAtributi
            {
                ProduktiId = item.ProduktiId,
                AtributiId = item.AtributiId,
                AtributiValue = item.AtributiValue
            }).ToList();

            await _produktiAtributiRepository.AddProductAttributesAsync(produktiAtributet);
        }

        public async Task<object> GetProductAttributesAsync(int produktiId)
        {
            return await _produktiAtributiRepository.GetProductAttributesAsync(produktiId);
        }

        public async Task<List<Atributi>> GetAvailableAttributesAsync(int produktiId)
        {
            return await _produktiAtributiRepository.GetAvailableAttributesAsync(produktiId);
        }

        public async Task UpdateProductAttributeAsync(int id, ProduktiAttributeVM produktiAtributiVM)
        {
            var produktiAtributi = await _produktiAtributiRepository.GetProductAttributeByIdAsync(id);

            if (produktiAtributi == null)
            {
                throw new KeyNotFoundException("Product attribute not found.");
            }

            produktiAtributi.AtributiValue = produktiAtributiVM.AtributiValue;
            await _produktiAtributiRepository.UpdateProductAttributeAsync(produktiAtributi);
        }

        /*
        public async Task RemoveProductAttributeAsync(int id)
        {
            var produktiAtributi = await _produktiAtributiRepository.GetProductAttributeByIdAsync(id);

            if (produktiAtributi == null)
            {
                throw new KeyNotFoundException("Atributi i produktit nuk u gjet!");
            }

            await _produktiAtributiRepository.RemoveProductAttributeAsync(produktiAtributi);
        }*/
    }
}
