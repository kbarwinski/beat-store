using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        [Required(ErrorMessage="AudioItemId is a required field.")]
        public Guid AudioItemId { get; set; }

        [ForeignKey("AudioItemId")]
        public AudioItem AudioItem { get; set; }

        public string OrderId { get; set; }
        [ForeignKey("OrderId")]
        public Order Order { get; set; }

        [Required(ErrorMessage="LicenseType is a required field.")]
        public string LicenseType { get; set; }
    }
}
