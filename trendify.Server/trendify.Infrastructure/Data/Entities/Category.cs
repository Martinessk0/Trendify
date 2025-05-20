using System.ComponentModel.DataAnnotations;
using trendify.Infrastructure.Data.Constants;

namespace trendify.Infrastructure.Data.Entities
{
    public class Category
    {
        public Category()
        {
            Products = new List<Product>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(CategoryConstants.NameMaxLength)]
        public string Name { get; set; } = null!;

        public List<Product> Products { get; set; }
        [Required]
        public bool IsActive { get; set; } = true;
    }
}
