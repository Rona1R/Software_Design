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

        public async Task<List<ZbritjaDTO>> GetAllZbritjetAsync()
        {
            return await _zbritjaRepository.GetAllZbritjetAsync(); 
        }

        public async Task<ZbritjaDTO> GetZbritjaByIdAsync(int id)
        {
            var zbritja = await _zbritjaRepository.GetZbritjaByIdAsync(id);
            if (zbritja == null)
            {
                throw new NotFoundException();
            }

            return new ZbritjaDTO
            {
                Zbritja_ID = id,
                ZbritjaEmri = zbritja.ZbritjaEmri,
                PerqindjaZbritjes = zbritja.PerqindjaZbritjes,
                DataKrijimit = zbritja.DataKrijimit,
                DataSkadimit = zbritja.DataSkadimit,    
            };
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

        public async Task RemoveZbritjaAsync(int id)
        {
            var zbritja = await _zbritjaRepository.GetZbritjaByIdAsync(id);
            if (zbritja == null)
            {
                throw new NotFoundException();
            }

            await _zbritjaRepository.DeleteZbritjaAsync(zbritja);

        }
    }



}
