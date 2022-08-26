using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObjects
{
    public class MinMaxDto<T>
    {
        public T Min { get; set; }
        public T Max { get; set; }
    }
}
