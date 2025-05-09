using System.ComponentModel.DataAnnotations;

namespace trendify.Server.Data.Entities
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }
        public AppUser User { get; set; } = null!;

        [Required]
        public string ProductId { get; set; }
        public Product Product { get; set; } = null!;

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; } = 1;

        public DateTime AddedAt { get; set; } = DateTime.UtcNow;
    }

}
