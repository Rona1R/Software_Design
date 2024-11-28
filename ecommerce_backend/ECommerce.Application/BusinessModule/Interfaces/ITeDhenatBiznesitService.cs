using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.BusinessModule.ViewModels;
using ECommerce.Domain.BusinessModule.Entities;

namespace ECommerce.Application.BusinessModule.Interfaces
{
    public interface ITeDhenatBiznesitService
    {

        TeDhenatBiznesit Get();

        Task UpdateAsync(TeDhenatBiznesitVM teDhenat);
    }
}
