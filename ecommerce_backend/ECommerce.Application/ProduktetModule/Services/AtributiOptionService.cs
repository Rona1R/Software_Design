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
    public class AtributiOptionService : IAtributiOptionService
    {
        private readonly IAtributiOptionRepository _repository;

        public AtributiOptionService(IAtributiOptionRepository repository)
        {
            _repository = repository;
        }


        public async Task CreateAsync(OptionVM option)
        {
            if(await _repository.OptionByAtributeAndValueAsync(option) != null)
            {
                throw new ExistsException("Ky opsion ekziston per kete atribut!");
            }

            await _repository.CreateAsync(option);
        }


        public async Task<AtributiOption> GetByIdAsync(int id)
        {
            var a = await _repository.GetByIdAsync(id);
            if(a == null)
            {
                throw new NotFoundException();
            }

            return a;
        }

        public async Task<List<AtributiOption>> GetOptionsByAtributeAsync(int atributiId)
        {
            return await _repository.GetOptionsByAtributeAsync(atributiId);
        }

        public async Task UpdateAsync(int id , OptionVM option)
        {
            var a = await _repository.GetByIdAsync(id);
            if (a == null)
            {
                throw new NotFoundException();  
            }

            var optionExists = await _repository.OptionByAtributeAndValueAsync(option); ;
            if (optionExists!=null && optionExists.Id != id)
            {
                throw new ExistsException("Ky opsion ekziston per kete atribut");
            }


            a.OptionValue = option.OptionValue;
            await _repository.UpdateOptionAsync(a);
        }
        public async Task DeleleteOptionAsync(int id)
        {
            var a = await _repository.GetByIdAsync(id);
            if (a == null)
            {
                throw new NotFoundException();
            }

            await _repository.DeleleteOptionAsync(a);
        }
    }
}
