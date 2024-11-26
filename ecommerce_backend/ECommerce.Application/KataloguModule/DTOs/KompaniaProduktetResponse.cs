using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Application.ProduktetModule.DTOs;

namespace ECommerce.Application.KataloguModule.DTOs
{
    public class KompaniaProduktetResponse
    {

        public ProduktetSipasKompanise TeDhenat { get; set; }   

        public int TotalCount { get; set; }
    }

    public class ProduktetSipasKompanise
    {
        public int Id { get; set; }

        public string Name { get; set; }    

        public List<ProduktetKompaniseDTO> Products { get; set; }   

    }
}
