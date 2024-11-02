using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Domain.ProduktetModule.Entities
{
    public class ProduktiAtributi
    {
        public int Id { get; set; }

        public string AtributiValue { get; set; }

        public int ProduktiId { get; set; }

        public int AtributiId { get; set; }

        [ForeignKey(nameof(ProduktiId))]
        public virtual Produkti Produkti { get; set; }

        [ForeignKey(nameof(AtributiId))]
        public virtual Atributi Atributi { get; set; }
    }
}
