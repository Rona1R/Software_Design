using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace ECommerce.Infrastructure.ProduktetModule.Repositories
{
    public class ZbritjaRepository : IZbritjaRepository
    {
        private readonly ECommerceDBContext _context;

        public ZbritjaRepository(ECommerceDBContext context)
        {
            _context = context;
        }

        public async Task AddZbritjaAsync(ZbritjaVM newZbritja)
        {
            var zbritja = new Zbritja()
            {
                ZbritjaEmri = newZbritja.ZbritjaEmri,
                PerqindjaZbritjes=newZbritja.PerqindjaZbritjes,
                DataSkadimit=newZbritja.DataSkadimit,
              
            };

            await _context.Zbritja.AddAsync(zbritja);
            await _context.SaveChangesAsync();
        }

        /*[HttpGet]
        [Route("shfaqZbritjen/{id}")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Get(int id)
        {
            var zbritja = await _context.Zbritja
                .Where(z => z.Zbritja_ID == id)
                .OrderByDescending(z => z.DataKrijimit)
                .Select(z => new
                {
                    z.Zbritja_ID,
                    z.ZbritjaEmri,
                    z.PerqindjaZbritjes,
                    z.DataKrijimit,
                    z.DataSkadimit,

                }).FirstOrDefaultAsync();

            if (zbritja == null)
            {
                return BadRequest("Zbritja nuk u gjet ne sistem.");
            }

            return Ok(zbritja);
        }*/

        /* public string? ZbritjaEmri { get; set; }
        public int PerqindjaZbritjes { get; set; }
        public DateTime? DataSkadimit { get; set; }*/

        public async Task<List<ZbritjaVM>> GetAllZbritjetAsync()
        {
            var zbritjet = await _context.Zbritja
               .OrderByDescending(r => r.DataKrijimit)
               .Select(r => new ZbritjaVM
               {
                   ZbritjaEmri=r.ZbritjaEmri,
                   PerqindjaZbritjes=r.PerqindjaZbritjes,
                   DataSkadimit=r.DataSkadimit

               }).ToListAsync();

            return zbritjet;
        }




    }
}
