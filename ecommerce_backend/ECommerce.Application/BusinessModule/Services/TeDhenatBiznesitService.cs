using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.BusinessModule.Interfaces;
using ECommerce.Application.BusinessModule.ViewModels;
using ECommerce.Application.Exceptions;
using ECommerce.Domain.BusinessModule.Entities;

namespace ECommerce.Application.BusinessModule.Services
{
    public class TeDhenatBiznesitService : ITeDhenatBiznesitService
    {

        private readonly ITeDhenatBiznesitRepository _repository;

        public TeDhenatBiznesitService(ITeDhenatBiznesitRepository repository)
        {
            _repository = repository;
        }

        public TeDhenatBiznesit Get()
        {
            return _repository.Get();   
        }

        public async Task UpdateAsync(TeDhenatBiznesitVM teDhenat)
        {
            var data = _repository.Get();

            if(data == null) {
                throw new NotFoundException();
            }

            await _repository.UpdateAsync(data, teDhenat);
        }
    }
}
