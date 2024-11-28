using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;


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

        public async Task<object> GetProductAttributesAsync(int produktiId)
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
        /*[HttpPost]
        [Route("add-product-attributes")]
        [Authorize(Roles = "Admin,Menaxher")]
        public async Task<IActionResult> Post([FromBody] List<ProduktiAtributiVM> atributet)
        {

            foreach (var item in atributet)
            {
                var produktiAtributi = new ProduktiAtributi()
                {
                    ProduktiId = item.ProduktiId,
                    AtributiId = item.AtributiId,
                    AtributiValue = item.AtributiValue,
                };

                await _context.ProduktiAtributi.AddAsync(produktiAtributi);
                await _context.SaveChangesAsync();
            }

            return Ok("Atributet jane shtuar me sukses!");
        }*/






    }
}
