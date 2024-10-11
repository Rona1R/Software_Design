using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ECommerceAPI.Produktet.Domain.Entities;

namespace ECommerceAPI.Order.Domain.Entities
{
    public class PorosiaItem
    {

        [Key]
        public int Item_ID { get; set; } 

      //  public decimal Cmimi {  get; set; } // cmimi total per sasine e porositur te atij produktit

        public int SasiaPorositur { get; set; }  

        public decimal Cmimi {  get; set; } // cmimi i produktit te blere ( 1 item )

        public int Porosia_ID { get; set; } 

        public int Produkti_ID { get; set; }


        [ForeignKey(nameof(Porosia_ID))]
        public virtual Porosia Porosia { get; set; }


        [ForeignKey(nameof(Produkti_ID))]
        public virtual Produkti Produkti { get; set; }  


    }
}
