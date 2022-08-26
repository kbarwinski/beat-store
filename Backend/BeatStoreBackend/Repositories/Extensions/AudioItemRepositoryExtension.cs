using Entities.Models;
using Entities.RequestParameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq.Dynamic.Core;

namespace Repositories.Extensions
{
    public static class AudioItemRepositoryExtension
    {
        public static IQueryable<AudioItem> FilterAudioItems(this IQueryable<AudioItem> items, AudioItemParameters audioItemParameters)
        {
            return items.Where(i =>
               i.Bpm >= audioItemParameters.MinBpm &&
               i.Bpm <= audioItemParameters.MaxBpm &&
               i.ExclusivePrice >= audioItemParameters.MinPrice &&
               i.LeasePrice <= audioItemParameters.MaxPrice &&
               (i.AppUser.UserName.Equals(audioItemParameters.Author) || string.IsNullOrEmpty(audioItemParameters.Author)) &&
               (i.Title.ToLower().Contains(audioItemParameters.Title.ToLower()) || string.IsNullOrEmpty(audioItemParameters.Title)) &&
               !i.IsBought
               );
        }

        public static IQueryable<AudioItem> SortAudioItems(this IQueryable<AudioItem> items, string orderByQuery)
        {
            if (string.IsNullOrWhiteSpace(orderByQuery))
                return items.OrderByDescending(i => i.CreatedAt);

                var orderParams = orderByQuery.Trim().Split(',');
                var propertyInfos = typeof(AudioItem).GetProperties();

                var orderQueryBuilder = new StringBuilder();

                foreach (var param  in orderParams)
                {
                    if (string.IsNullOrWhiteSpace(param))
                        continue;

                    var propertyFromQuery = param.Split(" ")[0];

                    var objectPropertyName = propertyInfos.FirstOrDefault(pi => 
                    pi.Name.Equals(propertyFromQuery, StringComparison.InvariantCultureIgnoreCase));

                    if (objectPropertyName == null)
                        continue;

                    var direction = param.EndsWith(" desc") ? "descending" : "ascending";

                    orderQueryBuilder.Append($"{objectPropertyName.Name.ToString()} {direction}");
                }

                var orderQuery = orderQueryBuilder.ToString().TrimEnd(',', ' ');

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderByDescending(i => i.CreatedAt);

            return items.OrderBy(orderQuery);
        }
        


    }
}
