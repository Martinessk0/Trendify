using System.ComponentModel.DataAnnotations;

namespace trendify.Server.Data.Entities
{
    public class OrderItem
    {
        [Key]
        public int Id { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; } = null!;

        public string ProductId { get; set; } = null!;
        public Product Product { get; set; } = null!;

        public int Quantity { get; set; } = 1;
    }
}
