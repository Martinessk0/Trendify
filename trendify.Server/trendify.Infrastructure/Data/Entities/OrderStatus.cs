using System.ComponentModel.DataAnnotations;
using trendify.Infrastructure.Data.Constants;

namespace trendify.Infrastructure.Data.Entities
{
    public class OrderStatus
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(OrderStatusConstants.NameMaxLength)]
        public string Name { get; set; } = null!;

        public List<Order> Orders { get; set; } = new List<Order>();

        [Required]
        public bool IsActive { get; set; } = true;
    }
}
