using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.Exceptions;
using ECommerce.Application.ProduktetModule.Interfaces;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Application.ProduktetModule.Services
{
    public class AtributiService : IAtributiService
    {
        private readonly IAtributiRepository _atributiRepository;

        public AtributiService(IAtributiRepository atributiRepository)
        {
            _atributiRepository = atributiRepository;
        }

        public async Task AddAttributeAsync(AtributiVM atributiVM)
        {
            var ekiston = await _atributiRepository.AttributeExists(atributiVM.Name);

            if (ekiston)
            {
                throw new AttributeExistsException("Ky atribut ekziston ! Zgjedh nje emer tjeter!");
            }

            await _atributiRepository.AddAtributeAsync(atributiVM);
        }


        public async Task<List<Atributi>> GetAllAsync() 
        {
            return await _atributiRepository.GetAllAsync(); 
        }

        public async Task<Atributi> GetAttributeByIdAsync(int id)
        {
            var atributi = await _atributiRepository.GetAtributeFromDbAsync(id);
            if(atributi == null)
            {
                throw new NotFoundException();
            }

            return atributi;    
        }
    }
}
