using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.DTOs;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;

namespace ECommerce.Application.ProduktetModule.Services
{
    public class ProduktiService : IProduktiService
    {
        private readonly IProduktiRepository _productRepository;

        public ProduktiService(IProduktiRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task CreateProductAsync(ProduktiVM produkti)
        {
            await _productRepository.AddProductAsync(produkti);
        }

        public async Task<List<ProduktiDTO>> GetAllProductsAsync()
        {
            return await _productRepository.GetAllProductsAsync();
        }

        public async Task<ProduktiDTO> GetProductByIdAsync(int id) // product to edit
        {
            var p = await _productRepository.GetByIdAsync(id);
            if (p == null)
            {
                throw new NotFoundException();

            }

            return new ProduktiDTO
            {
                Id = p.Produkti_ID,
                Emri = p.EmriProdukti,
                Foto = p.FotoProduktit,
                Pershkrimi = p.PershkrimiProduktit,
                Stoku = p.SasiaNeStok,
                Cmimi = p.CmimiPerCope,
                Kompania_ID = p.Kompania_ID,
                Kompania = p.Kompania.Kompania_Emri,
                Kategoria_ID = p.Kategoria_ID,
                Kategoria = p.Kategoria.EmriKategorise,
                NenKategoria_ID = p.NenKategoria_ID,
                Nenkategoria = p.NenKategoria.EmriNenkategorise,
                NeShitje = p.NeShitje
            };
        }

        public async Task<SidebarDataNeZbritje> GetSidebarDataNeZbritjeAsync()
        {

            return await _productRepository.GetSidebarDataNeZbritjeAsync();
        }

        public async Task<ProductsResponseDTO> GetFilteredProducts(string sortBy, int pageNumber, int pageSize
       , FilterNeZbritjeVM filters)
        {
            return await _productRepository.GetFilteredProducts(sortBy, pageNumber, pageSize, filters);
        }

        public async Task<DetajetProduktitVM> GetProductDetailsByIdAsync(int id)
        {
            var p = await _productRepository.GetByIdAsync(id);
            if (p == null)
            {
                throw new NotFoundException();

            }

            return new DetajetProduktitVM
            {
                Id = p.Produkti_ID,
                Name = p.EmriProdukti,
                Description = p.PershkrimiProduktit,
                Img = p.FotoProduktit,
                Cost = p.CmimiPerCope,
                Category = p.Kategoria.EmriKategorise,
                Subcategory = p.NenKategoria.EmriNenkategorise,
                CategoryId = p.Kategoria_ID,
                SubcategoryId = p.NenKategoria_ID,
                Stock = p.SasiaNeStok,
                CmimiMeZbritje = p.Zbritja != null && p.Zbritja.DataSkadimit >= DateTime.Now
                           ? p.CmimiPerCope - (decimal)p.Zbritja.PerqindjaZbritjes / 100 * p.CmimiPerCope
                           : null,
                Rating = p.Review.Any() ? (int)Math.Round(p.Review.Average(r => (double)r.Rating)) : null,

            };
        }

        public async Task<List<CartProductDTO>> GetProduktetSipasId(List<int> productIds)
        {
            return await _productRepository.GetProduktetSipasId(productIds);   
        }

        public async Task UpdateProductAsync(int id,ProduktiVM produktiVM)
        {
            var ekziston = await _productRepository.GetByIdAsync(id);
            if (ekziston == null)
            {
                throw new NotFoundException();

            }
            await _productRepository.UpdateProductAsync(ekziston, produktiVM);
        }

        public async Task<List<MeTeShituratDTO>> ShfaqMeTeShiturat()
        {
            return await _productRepository.ShfaqMeTeShiturat();
        }

        public async Task DeleteProductAsync(int id)
        {
            var ekziston = await _productRepository.GetByIdAsync(id);
            if (ekziston == null)
            {
                throw new NotFoundException();

            }
            await _productRepository.DeleteProductAsync(ekziston);
        }

    }
}

