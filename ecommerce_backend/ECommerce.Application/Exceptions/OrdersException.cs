﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Exceptions
{
    public class OrdersException : Exception
    {

        public OrdersException(string message) : base(message)
        {
        }
}
}
