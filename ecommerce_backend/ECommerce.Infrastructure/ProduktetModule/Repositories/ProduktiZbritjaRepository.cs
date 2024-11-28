using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.Interfaces;
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

        public async Task VendosNeZbritjeAsync(Produkti produkti, int zbritjaId)
        {
           
            produkti.Zbritja_ID = zbritjaId;
            produkti.DataVendsojesNeZbritje = DateTime.UtcNow;

            _context.Produkti.Update(produkti);
            await _context.SaveChangesAsync();
        }

        public async Task LargoNgaZbritjaAsync(Produkti produkti)
        {
         
            produkti.Zbritja_ID = null;
            _context.Produkti.Update(produkti);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ProduktZbritjaDTO>> ShfaqZbritjetProdukteveAsync()
        {
            var zbritjet = await _context.Produkti
                .Include(z => z.Zbritja) 
                .Where(z => z.Zbritja_ID != null) 
                .OrderByDescending(z => z.DataVendsojesNeZbritje)
                .Select(pz => new ProduktZbritjaDTO
                {
                    ProduktiID = pz.Produkti_ID,
                    ZbritjaID = pz.Zbritja_ID,
                    ProduktiEmri = pz.EmriProdukti,
                    CmimiParaZbritjes = pz.CmimiPerCope,
                    CmimiMeZbritje = pz.CmimiPerCope - (decimal)pz.Zbritja!.PerqindjaZbritjes / 100 * pz.CmimiPerCope,
                }).ToListAsync();

            return zbritjet;
        }

        public async Task<List<object>> ShfaqProduktetPaZbritjeAsync()
        {
            var paZbritje = await _context.Produkti
                .Where(p => p.Zbritja_ID == null) 
                .OrderByDescending(p => p.CreatedAt)
                .Select(p => new
                {
                    ProduktiID = p.Produkti_ID,
                    Emri = p.EmriProdukti
                }).ToListAsync();

            return paZbritje.Cast<object>().ToList();
        }

    }

}

