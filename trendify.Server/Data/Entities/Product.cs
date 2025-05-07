using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace trendify.Server.Data.Entities
{
    public class Product
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public bool IsOnSale { get; set; } = false;

        [Required]
        public bool IsItNew { get; set; } = false;

        [Required]
        public bool IsFeatured { get; set; } = false;

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = null!;

        [Required]
        [StringLength(50)]
        public string Category { get; set; } = null!;

        [Required]
        [StringLength(250)]
        public string ShortDescription { get; set; } = null!;

        [Required]
        [StringLength(1000)]
        public string Description { get; set; } = null!;

        [Required]
        [Column(TypeName = "money")]
        public decimal Price { get; set; }

        [Required]
        [StringLength(300)]
        public string ImageUrl { get; set; } = null!;

        [Required]
        public bool IsActive { get; set; } = true;

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime ModifiedAt { get; set; } = DateTime.UtcNow;
    }
}
