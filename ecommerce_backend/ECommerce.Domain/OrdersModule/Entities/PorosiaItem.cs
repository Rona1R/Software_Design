using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Domain.OrdersModule.Entities
{
    public class PorosiaItem
    {
        [Key]
        public int Item_ID { get; set; }

        //  public decimal Cmimi {  get; set; } // cmimi total per sasine e porositur te atij produktit

        public int SasiaPorositur { get; set; }

        public decimal Cmimi { get; set; } // cmimi i produktit te blere ( 1 item )

        public int Porosia_ID { get; set; }

        public int Produkti_ID { get; set; }


        [ForeignKey(nameof(Porosia_ID))]
        public virtual Porosia Porosia { get; set; }


        [ForeignKey(nameof(Produkti_ID))]
        public virtual Produkti Produkti { get; set; }
    }
}
