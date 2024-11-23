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
        Task<object> GetProduktinMeZbritjeAsync(int id);
        Task<bool> RemoveProductNgaZbritjaAsync(int produktiId);

        Task<string> VendosNeZbritjeAsync(int produktiId, int zbritjaId);


        Task<Produkti> PerditesoZbritjenProduktiAsync(int produktiId, int zbritjaId);

    }
}
