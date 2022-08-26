using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.RequestParameters
{
    public class AudioItemParameters : BaseParameters
    {
        public uint MinBpm { get; set; } = 0;
        public uint MaxBpm { get; set; } = int.MaxValue;

        public bool ValidBpmRange => MaxBpm > MinBpm;

        public decimal MinPrice { get; set; } = 0.0m;
        public decimal MaxPrice { get; set; } = decimal.MaxValue;

        public bool ValidPriceRange => MaxPrice > MinPrice;

        public string Author { get; set; } = "";

        public string Title { get; set; } = "";

        public string OrderBy { get; set; } = "";
    }
}
