using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Application.ProduktetModule.Interfaces
{
    public interface IAtributiService
    {
        Task AddAttributeAsync(AtributiVM atributiVM);

        Task<List<Atributi>> GetAllAsync();

        Task<Atributi> GetAttributeByIdAsync(int id);
    }
}
