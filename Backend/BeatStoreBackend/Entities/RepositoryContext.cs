using Entities.Configuration;
using Entities.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class RepositoryContext : IdentityDbContext<AppUser>
    {
        public RepositoryContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new RoleConfiguration());

            modelBuilder.ApplyConfiguration(new AppUserConfiguration());
            modelBuilder.ApplyConfiguration(new AppUserRoleConfiguration());

            modelBuilder.ApplyConfiguration(new AudioItemConfiguration());
        }


        public DbSet<AppUser> AppUsers {get; set;}
        public DbSet<AudioItem> AudioItems { get; set;}
        public DbSet<Order> Orders { get; set; }

    }
}
