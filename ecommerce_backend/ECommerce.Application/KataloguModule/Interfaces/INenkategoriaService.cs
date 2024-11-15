using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.KataloguModule.DTOs;
using ECommerce.Application.KataloguModule.ViewModels;

namespace ECommerce.Application.KataloguModule.Interfaces
{
    public interface INenkategoriaService
    {
        Task CreateAsync(NenKategoriaVM nenKategoriaVM);

        Task<List<NenKategoriaDTO>> GetAllAsync();

        Task<NenKategoriaDTO> GetByIdAsync(int id);
    }
}
