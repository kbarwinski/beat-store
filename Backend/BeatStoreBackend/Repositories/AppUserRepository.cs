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
    public class AppUserRepository : RepositoryBase<AppUser>, IAppUserRepository
    {
        public AppUserRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public void CreateAppUser(AppUser appUser)
        {
            Create(appUser);
        }

        public async Task<IEnumerable<AppUser>> GetAllAppUsersAsync(bool trackChanges)
        {
            return await FindAll(trackChanges).OrderBy(user => user.UserName).ToListAsync();
        }

        public async Task<AppUser> GetAppUserAsync(string appUserId, bool trackChanges)
        {
            return await FindByCondition(user => user.Id.Equals(appUserId), trackChanges).SingleOrDefaultAsync();
        }

        public async Task<AppUser> GetAppUserByUserNameAsync(string UserName, bool trackChanges)
        {
            return await FindByCondition(user => user.UserName.Equals(UserName), trackChanges).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<AppUser>> GetByIdsAsync(IEnumerable<string> ids, bool trackChanges)
        {
            return await FindByCondition(user => ids.Contains(user.Id), trackChanges).ToListAsync();
        }

        public async Task<AppUser> GetAppUserByInvitationCode(string invitationCode, bool trackChanges)
        {
            return await FindByCondition(user => user.InvitationCode.Equals(invitationCode), trackChanges).SingleOrDefaultAsync();
        }

    }
}
