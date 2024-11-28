using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerce.Domain.ProduktetModule.Entities;

namespace ECommerce.Domain.KataloguModule.Entities
{
    public class Kompania
    {
        [Key]
        public int Kompania_ID { get; set; }
        public String Kompania_Emri { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public virtual List<Produkti> Produkti { get; set; } = new List<Produkti>();    
    }
}
