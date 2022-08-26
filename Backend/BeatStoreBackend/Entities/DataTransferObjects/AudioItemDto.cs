using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObjects
{
    public class AudioItemDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int Bpm { get; set; }
        public decimal LeasePrice { get; set; }
        public decimal ExclusivePrice { get; set; }
        public string ImageUrl { get; set; }
        public string UserId { get; set; }
        public string DisplayName { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
