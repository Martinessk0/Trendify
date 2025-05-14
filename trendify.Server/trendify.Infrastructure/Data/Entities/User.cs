using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using trendify.Infrastructure.Data.Constants;

namespace trendify.Infrastructure.Data.Entities
{
    public class User : IdentityUser
    {
        [Required]
        [StringLength(UserConstants.FirstNameMaxLength)]
        public string FullName { get; set; } = null!;
        //[Required]
        //[StringLength(UserConstants.LastNameMaxLength)]
        //public string LastName { get; set; } = null!;
        //[StringLength(UserConstants.AddressMaxLength)]
        //public string Address { get; set; } = null!;
    }
}
