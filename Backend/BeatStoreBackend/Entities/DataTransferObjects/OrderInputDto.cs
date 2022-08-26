using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Stripe;
namespace Entities.DataTransferObjects
{
    public class OrderItemDto
    {
        public Guid AudioItemId { get; set; }

        [RegularExpression("lease|exclusive", ErrorMessage = "Disallowed license type.")]
        public string LicenseType { get; set; }
    }
    public class OrderInputDto
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public ICollection<OrderItemDto> OrderItems { get; set; }

    }
}
