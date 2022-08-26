using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObjects
{
    public class AudioItemUpdateDto
    {
        public string Title { get; set; }
        public int Bpm { get; set; }
        public decimal LeasePrice { get; set; }
        public decimal ExclusivePrice { get; set; }
    }
}
