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
    public class AtributiOptionRepository : IAtributiOptionRepository
    {
        private readonly ECommerceDBContext _context;

        public AtributiOptionRepository(ECommerceDBContext context)
        {
            _context = context;
        }

        public async Task CreateAsync(OptionVM option)
        {
            var op = new AtributiOption()
            {
                OptionValue = option.OptionValue,
                AtributiId = option.AtributiId
            };
            await _context.AtributiOption.AddAsync(op);
            await _context.SaveChangesAsync();
        }

        public async Task<AtributiOption?> OptionByAtributeAndValueAsync(OptionVM option)
        {
            return await _context.AtributiOption
             .FirstOrDefaultAsync(op => op.AtributiId == option.AtributiId &&
                               op.OptionValue.ToLower() == option.OptionValue.ToLower());
        }

        public async Task<List<AtributiOption>> GetOptionsByAtributeAsync(int atributiId)
        {
            return await _context.AtributiOption.OrderByDescending(a => a.Id)
             .Where(a => a.AtributiId == atributiId).ToListAsync();
        }

        public async Task<AtributiOption?> GetByIdAsync(int id)
        {
            return await _context.AtributiOption.FindAsync(id);
        }

        public async Task UpdateOptionAsync(AtributiOption atributiOption)
        {
           _context.Update(atributiOption);
            await _context.SaveChangesAsync();
        }

        public async Task DeleleteOptionAsync(AtributiOption option)
        {
            _context.AtributiOption.Remove(option);
            await _context.SaveChangesAsync();
        }
    }
}
