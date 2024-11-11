using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Exceptions
{
    public class AttributeExistsException : Exception
    {
        public AttributeExistsException() 
        {
        }
        public AttributeExistsException(string message) : base(message)
        {
        }
    }
}
