using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Application.ProduktetModule.Interfaces
{
    public interface IProduktiZbritjaRepository
    {
    
        Task<bool> LargoNgaZbritjaAsync(int produktiId);

        Task<string> VendosNeZbritjeAsync(int produktiId, int zbritjaId);

    }
}
