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
using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;



namespace ECommerce.Infrastructure.ProduktetModule.Repositories
{
    internal class ProduktiZbritjaRepository: IProduktiZbritjaRepository
    {
        private readonly ECommerceDBContext _context;


        public ProduktiZbritjaRepository(ECommerceDBContext context)
        {
            _context = context;
        }

        public async Task<string> VendosNeZbritjeAsync(int produktiId, int zbritjaId)
        {
           
            var ekzistonProdukti = await _context.Produkti.FirstOrDefaultAsync(p => p.Produkti_ID == produktiId);
            var ekzistonZbritja = await _context.Zbritja.FirstOrDefaultAsync(z => z.Zbritja_ID == zbritjaId);

        
            if (ekzistonProdukti == null)
            {
                return "Ky produkt nuk u gjet ne sistem!";
            }

            if (ekzistonProdukti.Zbritja_ID != null)
            {
                return "Ky Produkt ndodhet ne zbritje!";
            }

         
            if (ekzistonZbritja == null)
            {
                return "Kjo zbritje nuk u gjet ne sistem!";
            }

            ekzistonProdukti.Zbritja_ID = zbritjaId;
            ekzistonProdukti.DataVendsojesNeZbritje = DateTime.UtcNow;

            _context.Produkti.Update(ekzistonProdukti);
            await _context.SaveChangesAsync();

            return "Produkti u vendos ne zbritje me sukses!";
        }
        public async Task<bool> LargoNgaZbritjaAsync(int produktiId)
        {
         
            var produkti = await _context.Produkti.FirstOrDefaultAsync(p => p.Produkti_ID == produktiId);

            
            if (produkti == null)
            {
                return false; 
            }

            produkti.Zbritja_ID = null;

            _context.Produkti.Update(produkti);
            await _context.SaveChangesAsync();

            return true; 
        }


    }

}

