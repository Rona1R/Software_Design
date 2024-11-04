using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.ProduktetModule.DTOs
{
    public class ProduktiDTO
    {
        public int? Id { get; set; }
        public String? Emri { get; set; }

        public String? Foto { get; set; }

        public String? Pershkrimi { get; set; }

        public int? Stoku { get; set; }

        public decimal? Cmimi { get; set; }

        public int? Kompania_ID { get; set; }

        public string? Kompania { get; set; }
        public int? Kategoria_ID { get; set; }

        public string? Kategoria { get; set; }
        public int? NenKategoria_ID { get; set; }

        public string? Nenkategoria { get; set; }

        public bool? NeShitje { get; set; }
    }
}
