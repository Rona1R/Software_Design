using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Application.ProduktetModule.Interfaces
{
    public interface IProduktiAtributiService
    {
        Task<ProduktiAtributi?> GetByIdAsync(int id);
        Task AddProductAttributesAsync(List<ProduktiAttributeVM> produktiAtributetVM);

        Task<object?> GetProductAttributesAsync(int produktiId);

        Task<List<Atributi>> GetAvailableAttributesAsync(int produktiId);

        Task UpdateProductAttributeAsync(int id, ProduktiAttributeVM produktiAtributiVM);

        Task DeleteProduktiAtributiAsync(int id);
    }
}
