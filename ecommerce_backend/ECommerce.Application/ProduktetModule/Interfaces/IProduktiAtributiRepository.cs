using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Application.ProduktetModule.Interfaces
{
    public interface IProduktiAtributiRepository
    {
        Task AddProductAttributesAsync(List<ProduktiAtributi> produktiAtributet);

        Task<object> GetProductAttributesAsync(int produktiId);

        Task<List<Atributi>> GetAvailableAttributesAsync(int produktiId);

        Task UpdateProductAttributeAsync(ProduktiAtributi produktiAtributi);

        Task<ProduktiAtributi> GetProductAttributeByIdAsync(int id);

        Task DeleteAsync(ProduktiAtributi produktiAtributi);

    }
}
