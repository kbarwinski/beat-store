using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Configuration
{
    public class AppUserRoleConfiguration : IEntityTypeConfiguration<IdentityUserRole<string>>
    {
        public void Configure(EntityTypeBuilder<IdentityUserRole<string>> builder)
        {
            var ownerIur = new IdentityUserRole<string>
            {
                RoleId = "de65816d-ffb1-43c4-b348-b886155b191f",
                UserId = "98597c35-4af6-4d59-b256-88a2852d8f14"
            };

            var author1Iur = new IdentityUserRole<string>
            {
                RoleId = "863bc1c5-9528-43da-adc7-b0e1eca46e03",
                UserId = "32249352-0188-44c8-824d-00a16cd5ddf2"
            };

            var author2Iur = new IdentityUserRole<string>
            {
                RoleId = "863bc1c5-9528-43da-adc7-b0e1eca46e03",
                UserId = "259c3c36-4fa7-4ec4-8865-3ca70a4c48ce"
            };

            builder.HasData
            (
                ownerIur,
                author1Iur,
                author2Iur
            );
        }
    }
}
