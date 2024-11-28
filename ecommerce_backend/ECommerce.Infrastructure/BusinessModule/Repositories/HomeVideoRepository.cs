using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.BusinessModule.Interfaces;
using ECommerce.Domain.BusinessModule.Entities;
using Microsoft.EntityFrameworkCore;
using ECommerce.Infrastructure.Data;

namespace ECommerce.Infrastructure.BusinessModule.Repositories
{
    public class HomeVideoRepository : IHomeVideoRepository
    {
        private readonly ECommerceDBContext _context;
        public HomeVideoRepository(ECommerceDBContext context)
        {
            _context = context;
        }
        public async Task<HomeVideos?> GetByIdAsync(int id)
        {
            return await _context.HomeVideos.FindAsync(id);
        }

        public async Task CreateAsync(string filename)
        {
            var homeVideo = new HomeVideos()
            {
                VideoUrl = filename,
            };

            await _context.HomeVideos.AddAsync(homeVideo);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(HomeVideos video)
        {
            _context.HomeVideos.Remove(video);
            await _context.SaveChangesAsync();
        }

        public  async Task<List<HomeVideos>> GetAllAsync()
        {
            return await _context.HomeVideos.ToListAsync();
        }

    }
}
