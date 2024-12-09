using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Application.ProduktetModule.Interfaces
{
    public interface IAtributiOptionService
    {
        Task<AtributiOption> GetByIdAsync(int id);
        Task CreateAsync(OptionVM option);

        Task<List<AtributiOption>> GetOptionsByAtributeAsync(int atributiId);

        Task UpdateAsync(int id, OptionVM option);

        Task DeleleteOptionAsync(int id);
    }
}
