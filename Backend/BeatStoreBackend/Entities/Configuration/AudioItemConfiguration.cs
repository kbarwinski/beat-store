using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Entities.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entities.Configuration
{
    public class AudioItemConfiguration : IEntityTypeConfiguration<AudioItem>
    {
        public void Configure(EntityTypeBuilder<AudioItem> builder)
        {
            builder.HasData
            (
                new AudioItem
                {
                    Id = Guid.NewGuid(),
                    Title= "The Spectre Olagist",
                    Bpm= 173,
                    LeasePrice= 10.99m,
                    ExclusivePrice= 100.0m,
                    ImageUrl= "https://i.imgur.com/dJedjOr.jpg",
                    AudioUrl= "https://dl.dropbox.com/s/jpdlkg1nvwu5e1v/Alan_Walker_-_The_Spectre_Olagist.co_.mp3",
                    UserId = "98597c35-4af6-4d59-b256-88a2852d8f14"
                },
                new AudioItem
                {
                    Id = Guid.NewGuid(),
                    Title = "Sky High",
                    Bpm = 148,
                    LeasePrice = 20.99m,
                    ExclusivePrice = 200.0m,
                    ImageUrl = "https://i.imgur.com/cN2Z4uQ.jpg",
                    AudioUrl = "https://dl.dropbox.com/s/6kqet8538ejd2eb/Elektronomia_Sky_High.mp3",
                    UserId = "98597c35-4af6-4d59-b256-88a2852d8f14"
                },
                new AudioItem
                {
                    Id = Guid.NewGuid(),
                    Title = "Spinning Monkeys",
                    Bpm = 157,
                    LeasePrice = 30.99m,
                    ExclusivePrice = 300.0m,
                    ImageUrl = "https://i.imgur.com/0meaWWx.jpg",
                    AudioUrl = "https://dl.dropbox.com/s/1xotb98otbuxkcy/Monkeys%20Spinning%20Monkeys.mp3",
                    UserId = "98597c35-4af6-4d59-b256-88a2852d8f14"
                },
                new AudioItem
                {
                    Id = Guid.NewGuid(),
                    Title = "Sneaky Snitch",
                    Bpm = 108,
                    LeasePrice = 40.99m,
                    ExclusivePrice = 400.0m,
                    ImageUrl = "https://i.imgur.com/NG9Kkt9.jpg",
                    AudioUrl = "https://dl.dropbox.com/s/hs413cz02o5eoh3/Sneaky%20Snitch.mp3",
                    UserId = "32249352-0188-44c8-824d-00a16cd5ddf2"
                },
                new AudioItem
                {
                    Id = Guid.NewGuid(),
                    Title = "Wallpaper",
                    Bpm = 203,
                    LeasePrice = 50.99m,
                    ExclusivePrice = 500.0m,
                    ImageUrl = "https://i.imgur.com/sG55NPb.jpg",
                    AudioUrl = "https://dl.dropbox.com/s/gwhdglsiskvgdlh/Wallpaper.mp3",
                    UserId = "32249352-0188-44c8-824d-00a16cd5ddf2"
                },
                new AudioItem
                {
                    Id = Guid.NewGuid(),
                    Title = "Faded",
                    Bpm = 148,
                    LeasePrice = 20.99m,
                    ExclusivePrice = 200.0m,
                    ImageUrl = "https://i.imgur.com/zBO8WcX.jpg",
                    AudioUrl = "https://dl.dropbox.com/s/1f3r9ja2nbx8k3j/Alan-Walker-Faded.mp3",
                    UserId = "259c3c36-4fa7-4ec4-8865-3ca70a4c48ce"
                }
            );
        }
    }
}
