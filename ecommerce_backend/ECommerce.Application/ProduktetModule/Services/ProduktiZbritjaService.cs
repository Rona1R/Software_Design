using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.ProduktetModule.Entities;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Application.ProduktetModule.Services
{
    public class ProduktiZbritjaService : IProduktiZbritjaService
    {
        private readonly IProduktiZbritjaRepository _produktzbritjaRepository;
     

        public ProduktiZbritjaService(IProduktiZbritjaRepository productRepository)
        {
            _produktzbritjaRepository = productRepository;
           

        }

        public async Task<string> VendosNeZbritjeAsync(int produktiId, int zbritjaId)
        {
            return await _produktzbritjaRepository.VendosNeZbritjeAsync(produktiId, zbritjaId);
        }

        public async Task<bool> RemoveProductNgaZbritjaAsync(int produktiId)
        {
            
            return await _produktzbritjaRepository.LargoNgaZbritjaAsync(produktiId);
        }
    }
}
