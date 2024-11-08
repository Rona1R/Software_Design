using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.OrdersModule.DTOs
{
    public class ReceiptDetails
    {

        public int PorosiaId { get; set; }

        public string KlientiEmri {  get; set; }


        public string Adresa { get; set; }  


        public string Shteti { get; set; }  


        public string Qyteti { get; set; }


        public string ZipKodi { get; set; } 


        public string NrKontaktues { get; set; }    


        public DateTime DataPorosise { get; set; }

        public string StatusiPorosise { get; set; } 


        public decimal CmimiTotal { get; set; } 

        public List<ReceiptItems> Produktet { get; set; }   


    }

    public class ReceiptItems
    {
        public int SasiaPorositur { get; set; }

        public decimal Cmimi { get; set; }

        public string EmriProdukti { get; set; }    


        public string FotoProduktit { get; set; }   

    }
}
