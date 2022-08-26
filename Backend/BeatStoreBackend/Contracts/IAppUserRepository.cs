using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IAppUserRepository
    {
        Task<IEnumerable<AppUser>> GetAllAppUsersAsync(bool trackChanges);
        Task<AppUser> GetAppUserAsync(string appUserId, bool trackChanges);

        Task<AppUser> GetAppUserByUserNameAsync(string userName, bool trackChanges);

        Task<AppUser> GetAppUserByInvitationCode(string invitationCode, bool trackChanges);

        void CreateAppUser(AppUser appUser);

        Task<IEnumerable<AppUser>> GetByIdsAsync(IEnumerable<string> ids, bool trackChanges);
    }
}
