using System.ComponentModel.DataAnnotations;
using trendify.Infrastructure.Data.Constants;

namespace trendify.Infrastructure.Data.Entities
{
    public class DeliveryAddress
    {
        public DeliveryAddress(string streetAddress, string zipCode, string city, string? name)
        {
            StreetAddress = streetAddress;
            ZipCode = zipCode;
            City = city;
            Name = name;
        }
        [Key]
        public int Id { get; set; }
        [StringLength(DeliveryAddressConstants.StreetAddressMaxLength)]
        public string StreetAddress { get; set; }
        [StringLength(DeliveryAddressConstants.ZipCodeMaxLength)]
        public string ZipCode { get; set; }
        [StringLength(DeliveryAddressConstants.CityMaxLength)]
        public string City { get; set; }
        [StringLength(DeliveryAddressConstants.NameMaxLength)]
        public string? Name { get; set; }
    }
}
