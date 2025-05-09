using System.ComponentModel.DataAnnotations;

namespace trendify.Server.Data.Entities
{
    public class Review
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ProductId { get; set; }
        public Product Product { get; set; } = null!;

        [Required]
        public string Comment { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}
