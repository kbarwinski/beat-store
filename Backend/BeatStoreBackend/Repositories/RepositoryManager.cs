using Contracts;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class RepositoryManager : IRepositoryManager
    {
        private RepositoryContext repositoryContext;
        private IAudioItemRepository audioItemRepository;
        private IAppUserRepository appUserRepository;
        private IOrderRepository orderRepository;

        public RepositoryManager(RepositoryContext repositoryContext)
        {
            this.repositoryContext = repositoryContext;
        }

        public IAppUserRepository AppUserRepository
        {
            get
            {
                if (appUserRepository == null)
                    appUserRepository = new AppUserRepository(repositoryContext);

                return appUserRepository;
            }
        }

        public IAudioItemRepository AudioItemRepository
        {
            get
            {
                if(audioItemRepository == null)
                    audioItemRepository = new AudioItemRepository(repositoryContext);
                return audioItemRepository;
            }
        }

        public IOrderRepository OrderRepository
        {
            get
            {
                if (orderRepository == null)
                    orderRepository = new OrderRepository(repositoryContext);
                return orderRepository;
            }
        }

        public async Task<int> SaveAsync()
        {
            return await repositoryContext.SaveChangesAsync();
        }
    }
}
