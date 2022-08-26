using Contracts;
using Entities;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class OrderRepository : RepositoryBase<Order>, IOrderRepository
    {

        public OrderRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
            
        }

        public async Task<IEnumerable<Order>> GetAllOrdersAsync(bool trackChanges)
        {
            return await FindAll(trackChanges).ToListAsync();
        }

        public async Task<Order> GetOrderByIdAsync(string id, bool trackChanges)
        {
            return await FindByCondition(o => o.Id.Equals(id), trackChanges).Include(o => o.OrderItems).SingleOrDefaultAsync();
        }

        public void CreateOrder(Order order)
        {
            Create(order);
        }

        public void DeleteOrder(Order order)
        {
            Delete(order);
        }


    }
}
