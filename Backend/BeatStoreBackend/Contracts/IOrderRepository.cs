using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IOrderRepository
    {
        public Task<Order> GetOrderByIdAsync(string id, bool trackChanges);
        public Task<IEnumerable<Order>> GetAllOrdersAsync(bool trackChanges);
        public void CreateOrder(Order order);
        public void DeleteOrder(Order order);


    }
}
