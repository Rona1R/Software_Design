using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Domain.ProduktetModule.Entities
{
    public class Atributi
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string DataType { get; set; }

        public virtual List<ProduktiAtributi> ProduktiAtributi { get; set; } = new List<ProduktiAtributi>();
        public virtual List<AtributiOption> AtributiOption { get; set; } = new List<AtributiOption>();
    }
}
