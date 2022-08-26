using Entities.Models;
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
    public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
    {
        private string GeneratePassword(AppUser user, string password)
        {
            var passwordHash = new PasswordHasher<AppUser>();
            return passwordHash.HashPassword(user, password);
        }
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            var owner = new AppUser
            {
                Id = "98597c35-4af6-4d59-b256-88a2852d8f14",
                UserName = "Author1",
                NormalizedUserName = "AUTHOR1",
                Email = "Author1@test.com",
                NormalizedEmail = "AUTHOR1@TEST.COM",
                PhoneNumber = "XXXXXXXXX",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                SecurityStamp = new Guid().ToString("D"),
                InvitationCode="A"
            };
            owner.PasswordHash = GeneratePassword(owner, "12345678");

            var author1 = new AppUser
            {
                Id = "32249352-0188-44c8-824d-00a16cd5ddf2",
                UserName = "Author2",
                NormalizedUserName = "AUTHOR2",
                Email = "Author2@test.com",
                NormalizedEmail = "AUTHOR2@TEST.COM",
                PhoneNumber = "XXXXXXXXX",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                SecurityStamp = new Guid().ToString("D"),
                InvitationCode = "B"
            };
            author1.PasswordHash = GeneratePassword(author1, "12345678");

            var author2 = new AppUser
            {
                Id = "259c3c36-4fa7-4ec4-8865-3ca70a4c48ce",
                UserName = "Author3",
                NormalizedUserName = "AUTHOR3",
                Email = "Author3@test.com",
                NormalizedEmail = "AUTHOR3@TEST.COM",
                PhoneNumber = "XXXXXXXXX",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                SecurityStamp = new Guid().ToString("D"),
                InvitationCode = "C"
            };
            author2.PasswordHash = GeneratePassword(author2, "12345678");



            builder.HasData
            (
                owner,
                author1,
                author2
            );
        }
    }
}
