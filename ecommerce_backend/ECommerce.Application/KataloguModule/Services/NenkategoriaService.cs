using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.Exceptions;
using ECommerce.Application.KataloguModule.DTOs;
using ECommerce.Application.KataloguModule.Interfaces;
using ECommerce.Application.KataloguModule.ViewModels;

namespace ECommerce.Application.KataloguModule.Services
{
    public class NenkategoriaService : INenkategoriaService
    {
        private readonly INenkategoriaRepository _nenkategoriaRepository;
        

        public NenkategoriaService(INenkategoriaRepository nenkategoriaRepository)
        {
            _nenkategoriaRepository = nenkategoriaRepository;
        }   

        public async Task CreateAsync(NenKategoriaVM nenKategoriaVM)
        {
            var exists = await _nenkategoriaRepository.NenkategoriaEkziston(nenKategoriaVM.Emri);
            if (exists) { // vailidimi
                throw new ExistsException("Ekziston nje nenkategori me kete emer!");
            }

            await _nenkategoriaRepository.CreateAsync(nenKategoriaVM);
        }

        public async Task<List<NenKategoriaDTO>> GetAllAsync()
        {
            return await _nenkategoriaRepository.GetAllAsync();
        }

        public async Task<NenKategoriaDTO> GetByIdAsync(int id)
        {
            var nenkategoria = await _nenkategoriaRepository.GetByIdAsync(id);
            if(nenkategoria == null)
            {
                throw new NotFoundException();
            }

            return new NenKategoriaDTO
            {
                Id = nenkategoria.NenKategoria_ID,
                Emri = nenkategoria.EmriNenkategorise,
                Kategoria = nenkategoria.Kategoria.EmriKategorise,
                KategoriaID = nenkategoria.Kategoria_ID
            };

        }
    }
}
