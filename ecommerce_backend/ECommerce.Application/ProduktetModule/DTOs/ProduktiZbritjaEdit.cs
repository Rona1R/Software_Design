using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.ProduktetModule.DTOs
{
    public class ProduktiZbritjaEdit
    {

        public int Produkti_ID { get; set; }    
        
        public string? EmriProdukti { get; set; }


         public int?  Zbritja_ID { get; set; }

         public string ZbritjaEmri { get; set; }


         public int PerqindjaZbritjes {  get; set; }    
    }
}
