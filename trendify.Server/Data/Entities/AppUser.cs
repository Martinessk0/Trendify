using Microsoft.AspNetCore.Identity;

namespace trendify.Server.Data.Entities
{
    public class AppUser : IdentityUser
    {
        public string? FullName { get; set; }
    }
}
