using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.DTOs;

namespace ECommerce.Application.ProduktetModule.Interfaces
{
    public interface IProduktiZbritjaService
    {
        
        Task<bool> RemoveProductNgaZbritjaAsync(int produktiId);

        Task<string> VendosNeZbritjeAsync(int produktiId, int zbritjaId);
        
        }
}
