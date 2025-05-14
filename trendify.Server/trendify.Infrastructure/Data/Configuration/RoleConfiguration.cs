using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Infrastructure.Data.Configuration
{
    internal class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(SeedRole());
        }

        private List<IdentityRole> SeedRole()
        {
            var roles = new List<IdentityRole>();

            var role = new IdentityRole { Id = "1", Name = "User", NormalizedName = "USER" };
            roles.Add(role);
             role = new IdentityRole { Id = "2", Name = "Admin", NormalizedName = "ADMIN" };
            roles.Add(role);

            return roles;
        }
    }
}
