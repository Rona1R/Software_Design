using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.OrdersModule.DTOs
{
    public class OrderDTO
    {

        public int PorosiaID { get; set; }

        public int KlientiId { get; set; }

        public string Klienti { get; set; }

        public DateTime DataPorosise { get; set; }


        public decimal Totali { get; set; }

        public string Statusi { get; set; } 

        public string MetodaPageses { get; set; }   

        public AdresaDerguese AdresaDerguese { get; set; }  


        public List<OrderDetails> DetajetPorosise { get; set; }   

    }

    public class AdresaDerguese
    {
        public string Adresa { get; set; }

        public string Qyteti { get; set; }

        public string ZipKodi { get; set; }

        public string Shteti { get; set; }

    }


    public class OrderDetails
    {

        public int ProduktiID { get; set; }

        public string ProduktiEmri {  get; set; }   


        public string Foto { get; set; }    

        public int Sasia { get; set; }  


        public decimal Cmimi { get; set; }  
   }
}
