using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Domain.ProduktetModule.Entities
{
    public class AtributiOption
    {
        public int Id { get; set; }

        public string OptionValue { get; set; }

        public int AtributiId { get; set; }

        [ForeignKey(nameof(AtributiId))]
        public virtual Atributi Atributi { get; set; }
    }
}
