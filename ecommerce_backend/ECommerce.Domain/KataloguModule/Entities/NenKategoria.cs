using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Domain.KataloguModule.Entities
{
    public class NenKategoria
    {
        [Key]
        public int NenKategoria_ID { get; set; }

        public string EmriNenkategorise { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        //  Nenkategoria (m) --- Kategoria (1)

        public int Kategoria_ID { get; set; }

        [ForeignKey(nameof(Kategoria_ID))]
        public virtual Kategoria Kategoria { get; set; } 

        public virtual List<Produkti> Produkti { get; set; } = new List<Produkti>();
    }
}
