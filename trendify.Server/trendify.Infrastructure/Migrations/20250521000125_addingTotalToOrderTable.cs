using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace trendify.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class addingTotalToOrderTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Orders",
                type: "money",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "fe0f0881-a76d-4cd6-9a79-3f6adbd5f82f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e4661f47-4374-44ed-992a-79bbd6b1399a", "AQAAAAIAAYagAAAAEMPmdjU6bWuiWvV1sa2iS2yDYYOkfjjIeO5O1K2xt2mTXIoy5McJAEqAY5VIzy6Y0Q==", "fbdde273-9d9e-4e0e-b46f-290c47191c7f" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Orders");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "fe0f0881-a76d-4cd6-9a79-3f6adbd5f82f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "07242c56-0b22-4b52-9e57-ef0a9f8bc2fe", "AQAAAAIAAYagAAAAEIgqUj6WPPFTPVtJU1degxQp9dF672I92ijPxHAx5HTtcO69xqAXrWRm6RNfYByyeQ==", "25b0654e-34b1-4bc5-9241-7e4afba7249d" });
        }
    }
}
