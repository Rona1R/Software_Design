using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Application.ProduktetModule.ViewModels;

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
    }
}
