using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.ViewModels;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Application.ProduktetModule.Interfaces
{
    public interface IAtributiRepository
    {
        Task<Atributi?> GetAtributeFromDbAsync(int id);

        Task<bool> AttributeExists(string name);

        Task<bool> AttributeExists(int id, string name);
        Task AddAtributeAsync(AtributiVM atributiVM);

        Task<List<Atributi>> GetAllAsync();

        Task UpdateAttributeAsync(Atributi atributi, string name);

        Task DeleteAttributeAsync(Atributi atributi);
    }
}
