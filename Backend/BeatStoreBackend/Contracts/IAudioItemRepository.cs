using Entities.Models;
using Entities.RequestParameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IAudioItemRepository
    {

        Task<IEnumerable<AudioItem>> GetAllAudioItemsAsync(AudioItemParameters audioItemParameters, bool trackChanges);

        void CreateAudioItemForAppUser(string appUserId, AudioItem audioItem);
        void DeleteAudioItem(AudioItem audioItem);

        Task<IEnumerable<int>> GetMinMaxAudioItemsBpm(bool trackChanges);

        Task<IEnumerable<decimal>> GetMinMaxPrices(bool trackChanges);

        Task<AudioItem> GetAudioItemByIdAsync(Guid audioItemId, bool trackChanges);
    }
}
