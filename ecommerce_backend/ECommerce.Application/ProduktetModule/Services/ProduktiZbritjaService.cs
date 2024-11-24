using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.Interfaces;

namespace ECommerce.Application.ProduktetModule.Services
{
    public class ProduktiZbritjaService : IProduktiZbritjaService
    {
        private readonly IProduktiZbritjaRepository _produktzbritjaRepository;
        private readonly IProduktiRepository _produktiRepository;
        private readonly IZbritjaRepository _zbritjaRepository;
     

        public ProduktiZbritjaService(IProduktiZbritjaRepository produktiZbritjaRepository,IProduktiRepository produktiRepository,IZbritjaRepository zbritjaRepository)
        {
            _produktzbritjaRepository = produktiZbritjaRepository;
            _produktiRepository = produktiRepository;   
            _zbritjaRepository = zbritjaRepository;
           

        }

        public async Task<ProduktiZbritjaEdit> GetProduktinMeZbritjeAsync(int id)
        {
            var product = await _produktiRepository.GetByIdAsync(id);

            if (product == null)
            {
                throw new NotFoundException("Ky produkt nuk u gjet ne sistem!");
            }

            return new ProduktiZbritjaEdit()
            {
                Produkti_ID = id,
                EmriProdukti = product.EmriProdukti,
                Zbritja_ID = product.Zbritja_ID,
                ZbritjaEmri = product.Zbritja?.ZbritjaEmri ?? "Unavailable",
                PerqindjaZbritjes = product.Zbritja?.PerqindjaZbritjes ?? 0,

            };

        }

        public async Task VendosNeZbritjeAsync(int produktiId, int zbritjaId)
        {
            var product = await _produktiRepository.GetByIdAsync(produktiId);

            if(product == null)
            {
                throw new NotFoundException("Ky produkt nuk u gjet ne sistem!");
            }

            var zbritja = await _zbritjaRepository.GetZbritjaByIdAsync(zbritjaId);  
            if(zbritja == null)
            {
                throw new NotFoundException("Kjo zbritje nuk u gjet ne sistem!");
            }


            await _produktzbritjaRepository.VendosNeZbritjeAsync(product, zbritjaId);
        }

        public async Task RemoveProductNgaZbritjaAsync(int produktiId)
        {
            var product = await _produktiRepository.GetByIdAsync(produktiId);

            if (product == null)
            {
                throw new NotFoundException("Ky produkt nuk u gjet ne sistem!");
            }

            await _produktzbritjaRepository.LargoNgaZbritjaAsync(product);
        }

        public async Task<List<ProduktZbritjaDTO>> ShfaqZbritjetProdukteveAsync()
        {
            return await _produktzbritjaRepository.ShfaqZbritjetProdukteveAsync();
        }


        public async Task<List<object>> ShfaqProduktetPaZbritjeAsync()
        {
            return await _produktzbritjaRepository.ShfaqProduktetPaZbritjeAsync();
        }
    }
}
