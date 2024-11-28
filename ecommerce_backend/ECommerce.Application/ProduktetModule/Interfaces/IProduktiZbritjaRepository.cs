using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Application.ProduktetModule.Interfaces
{
    public interface IProduktiZbritjaRepository
    {

        Task LargoNgaZbritjaAsync(Produkti produkti);

        Task VendosNeZbritjeAsync(Produkti produkti, int zbritjaId);
        
        Task<List<ProduktZbritjaDTO>> ShfaqZbritjetProdukteveAsync();

        Task<List<object>> ShfaqProduktetPaZbritjeAsync();

      //  Task UpdateProductAttributeAsync(ProduktiAtributi produktiAtributi);

       // Task<ProduktiAtributi> GetProductAttributeByIdAsync(int id);

     //   Task RemoveProductAttributeAsync(ProduktiAtributi produktiAtributi);
    }
}
