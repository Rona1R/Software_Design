using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Infrastructure.ProduktetModule.Repositories
{
    public class AtributiRepository : IAtributiRepository
    {

        private readonly ECommerceDBContext _context;


        public AtributiRepository(ECommerceDBContext context)
        {
            _context = context;
        }

        public async Task<Atributi?> GetAtributeFromDbAsync(int id)
        {
            return await _context.Atributi.FindAsync(id);
        }

        public async Task<bool> AttributeExists(string name)
        {
            return await _context.Atributi.FirstOrDefaultAsync(a => a.Name.ToLower() == name.ToLower()) != null;
        }

        public async Task<bool> AttributeExists(int id,string name)
        {
            return await _context.Atributi.FirstOrDefaultAsync(a => a.Name.ToLower() == name.ToLower()
            && a.Id != id
            ) !=null;
        }
        public async Task AddAtributeAsync(AtributiVM atributiVM)
        {
            var atr = new Atributi()
            {
                Name = atributiVM.Name,
                DataType = atributiVM.DataType,
            };

            await _context.Atributi.AddAsync(atr);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Atributi>> GetAllAsync()
        {
            return await _context.Atributi.OrderByDescending(a => a.Id).ToListAsync();

        }

        public async Task UpdateAttributeAsync(Atributi atributi,string name)
        {
            atributi.Name = name;  
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAttributeAsync(Atributi atributi)
        {
            _context.Atributi.Remove(atributi);
            await _context.SaveChangesAsync();
        }
        
    }
}
