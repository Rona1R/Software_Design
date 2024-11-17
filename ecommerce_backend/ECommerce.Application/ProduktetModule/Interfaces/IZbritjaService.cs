using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Application.ProduktetModule.Interfaces
{
    public interface IZbritjaService
    {
        Task PostZbritjaAsync(ZbritjaVM newZbritja);

        Task<List<ZbritjaDTO>> GetAllZbritjetAsync();

        Task<ZbritjaDTO> GetZbritjaByIdAsync(int id);

        Task UpdateZbritjaAsync(int id, ZbritjaVM zbritjaVM);

       // Task<bool> ZbritjaExists(int id, string name);
    }
}
