using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class OrderItem
    {
        [Column("OrderItemId")]
        public Guid Id { get; set; }

        public Guid AudioItemId { get; set; }

        [ForeignKey("AudioItemId")]
        public AudioItem AudioItem { get; set; }

        public string OrderId { get; set; }
        [ForeignKey("OrderId")]
        public Order Order { get; set; }

        public string LicenseType { get; set; }
    }
}
