using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Application.UsersModule.Interfaces;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Application.ProduktetModule.Services
{
    public class ZbritjaService: IZbritjaService
    {
        private readonly IZbritjaRepository _zbritjaRepository;
       

        public ZbritjaService(IZbritjaRepository zbritjaRepository)
        {
            _zbritjaRepository = zbritjaRepository;
            
        }
        /*public async Task CreateProductAsync(ProduktiVM produkti)
        {
            await _productRepository.AddProductAsync(produkti);
        }*/
        
        public async Task PostZbritjaAsync(ZbritjaVM newZbritja)
        {
            await _zbritjaRepository.AddZbritjaAsync(newZbritja);
        }

        public async Task<List<ZbritjaDTO>> GetAllZbritjetAsync()
        {
            return await _zbritjaRepository.GetAllZbritjetAsync(); 
        }

    }
}
