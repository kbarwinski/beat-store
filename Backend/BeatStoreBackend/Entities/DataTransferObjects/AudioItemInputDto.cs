using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObjects
{
    public class AudioItemInputDto
    {
        public string Title { get; set; }
        public int Bpm { get; set; }
        public decimal LeasePrice { get; set; }
        public decimal ExclusivePrice { get; set; }

        public IFormFile? Image { get; set; }
        public IFormFile? Audio { get; set; }
        public string? AudioUrl { get; set; }
        public string? ImageUrl { get; set; }
    }
}
