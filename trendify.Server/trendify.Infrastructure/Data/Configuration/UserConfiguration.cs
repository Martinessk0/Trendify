using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using trendify.Infrastructure.Data.Entities;

namespace trendify.Infrastructure.Data.Configuration
{
    internal class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasData(SeedUsers());
        }

        private List<User> SeedUsers()
        {
            var users = new List<User>();
            var hasher = new PasswordHasher<User>();

            var user = new User()
            {
                Id = "fe0f0881-a76d-4cd6-9a79-3f6adbd5f82f",
                //FirstName = "Martin",
                //LastName = "Grahovski",
                FullName = "Martin Grahovski",
                UserName = "test@test.bg",
                NormalizedUserName = "TEST@TEST.BG",
                Email = "test@test.bg",
                NormalizedEmail = "TEST@TEST.BG",
                //Address = "Admin Street 6"
            };

            user.PasswordHash =
                 hasher.HashPassword(user, "Test123/");

            users.Add(user);

            //user = new User()
            //{
            //    Id = "06552aa5-bcbe-49ef-ac65-fd84699d0d3e",
            //    FirstName = "Guest",
            //    LastName = "Guestov",
            //    UserName = "Guest",
            //    NormalizedUserName = "GUEST",
            //    Email = "guest@gmail.com",
            //    NormalizedEmail = "GUEST@GMAIL.COM",
            //    Address = "Guest Street 3"
            //};

            //user.PasswordHash =
            //hasher.HashPassword(user, "Guest123/");

            //users.Add(user);


            return users;
        }
    }
}
