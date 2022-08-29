using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{


    public class Order
    {
        [Column("OrderId")]
        public string Id { get; set; }

        public string? Name { get; set; }
        public string? Email { get; set; }

        [Required(ErrorMessage="Order Items is a required field.")]
        public ICollection<OrderItem> OrderItems { get; set; }
        public decimal? Totals { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsFulfilled { get; set; }

        public Order()
        {
            CreatedAt = DateTime.UtcNow;
            IsFulfilled = false;
        }
    }
}
