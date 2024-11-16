using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.Exceptions;
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

        public async Task PostZbritjaAsync(ZbritjaVM newZbritja)
        {
            await _zbritjaRepository.AddZbritjaAsync(newZbritja);
        }

        public async Task<List<Zbritja>> GetAllZbritjetAsync()
        {
            return await _zbritjaRepository.GetAllZbritjetAsync(); 
        }

        public async Task<Zbritja> GetZbritjaByIdsAsync(int id)
        {
            var zbritja = await _zbritjaRepository.GetZbritjaByIdAsync(id);
            if (zbritja == null)
            {
                throw new NotFoundException();
            }

            return zbritja;
        }

       

         public async Task UpdateZbritjaAsync(int id, ZbritjaVM zbritjaVM)
         {
             var zbritja = await _zbritjaRepository.GetZbritjaByIdAsync(id);
             if (zbritja == null)
             {
                    throw new NotFoundException();  
             }

             await _zbritjaRepository.UpdateZbritjaAsync(zbritja, zbritjaVM);
         }
    }



}
