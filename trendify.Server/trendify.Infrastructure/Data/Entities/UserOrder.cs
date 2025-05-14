using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace trendify.Infrastructure.Data.Entities
{
    public class UserOrder
    {
        [Required]
        public string UserId { get; set; } = null!;
        [ForeignKey(nameof(UserId))]
        public User User { get; set; } = null!;
        [Required]
        public int OrderId { get; set; }
        [ForeignKey(nameof(OrderId))]
        public Order Order { get; set; }
    }
}
