using Microsoft.AspNetCore.Identity;

namespace trendify.Server.Entities
{
    public class AppUser : IdentityUser
    {
        public string? FullName { get; set; }
    }
}
