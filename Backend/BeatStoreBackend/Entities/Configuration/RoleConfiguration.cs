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
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(
                new IdentityRole
                {
                    Id = "de65816d-ffb1-43c4-b348-b886155b191f",
                    Name = "Owner",
                    NormalizedName = "OWNER"
                },
                new IdentityRole
                {
                    Id = "863bc1c5-9528-43da-adc7-b0e1eca46e03",
                    Name = "Author",
                    NormalizedName = "AUTHOR"
                }
                );
        }
    }
}
