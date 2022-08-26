using Contracts;
using Entities;
using Entities.Models;
using Entities.RequestParameters;
using Microsoft.EntityFrameworkCore;
using Repositories.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class AudioItemRepository : RepositoryBase<AudioItem>, IAudioItemRepository
    {
        public AudioItemRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public void CreateAudioItemForAppUser(string appUserId, AudioItem audioItem)
        {
            audioItem.UserId = appUserId;
            Create(audioItem);
        }

        public void DeleteAudioItem(AudioItem audioItem)
        {
            Delete(audioItem);
        }

        public async Task<IEnumerable<AudioItem>> GetAllAudioItemsAsync(AudioItemParameters audioItemParameters, bool trackChanges)
        {
            return await FindAll(false)
                .FilterAudioItems(audioItemParameters)
                .SortAudioItems(audioItemParameters.OrderBy)
                .Include(i => i.AppUser)
                .ToListAsync();
        }

        public async Task<AudioItem> GetAudioItemByIdAsync(Guid audioItemId, bool trackChanges)
        {
            return await FindByCondition(item => item.Id.Equals(audioItemId), trackChanges).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<int>> GetMinMaxAudioItemsBpm(bool trackChanges)
        {
            int maxBpm = FindAll(trackChanges).Max(i => i.Bpm);
            int minBpm = FindAll(trackChanges).Min(i => i.Bpm);

            return new int[2] { minBpm, maxBpm }.ToList();
        }

        public async Task<IEnumerable<decimal>> GetMinMaxPrices(bool trackChanges)
        {
            decimal maxPrice = FindAll(trackChanges).Max(i => i.ExclusivePrice);
            decimal minPrice = FindAll(trackChanges).Min(i => i.LeasePrice);

            return new decimal[2] { minPrice, maxPrice }.ToList();
        }
    }
}
