﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.KataloguModule.DTOs
{
    public class KategoriaDTO
    {
        public int Id { get; set; }

        public string? Emri { get; set; }

        public string? Pershkrimi { get; set; }
    }
}