using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Application.ProduktetModule.Interfaces
{
    public interface IProduktiZbritjaService
    {
        Task<ProduktiZbritjaEdit> GetProduktinMeZbritjeAsync(int id);
        Task RemoveProductNgaZbritjaAsync(int produktiId);

        Task VendosNeZbritjeAsync(int produktiId, int zbritjaId);

        Task<List<ProduktZbritjaDTO>> ShfaqZbritjetProdukteveAsync();

        Task<List<object>> ShfaqProduktetPaZbritjeAsync();

    }
}
