using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.ProduktetModule.Repositories 
{
    public class ProduktiAtributiRepository : IProduktiAtributiRepository
    {
        private readonly ECommerceDBContext _context;


        public ProduktiAtributiRepository(ECommerceDBContext context)
        {
            _context = context;
        }

        public async Task AddProductAttributesAsync(List<ProduktiAtributi> produktiAtributet)
        {
            await _context.ProduktiAtributi.AddRangeAsync(produktiAtributet);
            await _context.SaveChangesAsync();
        }

        public async Task<object?> GetProductAttributesAsync(int produktiId)
        {
            var produktiMeAtribute = await _context.Produkti
                .Where(p => p.Produkti_ID == produktiId)
                .Select(p => new
                {
                    p.Produkti_ID,
                    p.EmriProdukti,
                    Atributet = p.ProduktiAtributi.Select(pa => new
                    {
                        pa.Id,
                        pa.Atributi.Name,
                        pa.AtributiValue
                    })
                })
                .FirstOrDefaultAsync();

            return produktiMeAtribute;
        }

        public async Task<List<Atributi>> GetAvailableAttributesAsync(int produktiId)
        {
            var atributetProduktit = await _context.ProduktiAtributi
                .Where(p => p.ProduktiId == produktiId)
                .Select(p => p.AtributiId)
                .ToListAsync();

            var allAttributes = await _context.Atributi.ToListAsync();

            return allAttributes
                .Where(a => !atributetProduktit.Contains(a.Id))
                .ToList();
        }

        public async Task<ProduktiAtributi?> GetProductAttributeByIdAsync(int id)
        {
            return await _context.ProduktiAtributi.FindAsync(id);
        }


        public async Task UpdateProductAttributeAsync(ProduktiAtributi produktiAtributi)
        {
            _context.ProduktiAtributi.Update(produktiAtributi);
            await _context.SaveChangesAsync();
        }


        public async Task DeleteAsync(ProduktiAtributi produktiAtributi)
        {
            _context.ProduktiAtributi.Remove(produktiAtributi);
            await _context.SaveChangesAsync();
        }





    }
}
