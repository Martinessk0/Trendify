using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace trendify.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddingIsActiveInOrderStatuses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "OrderStatuses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "fe0f0881-a76d-4cd6-9a79-3f6adbd5f82f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "07242c56-0b22-4b52-9e57-ef0a9f8bc2fe", "AQAAAAIAAYagAAAAEIgqUj6WPPFTPVtJU1degxQp9dF672I92ijPxHAx5HTtcO69xqAXrWRm6RNfYByyeQ==", "25b0654e-34b1-4bc5-9241-7e4afba7249d" });

            migrationBuilder.UpdateData(
                table: "OrderStatuses",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "OrderStatuses",
                keyColumn: "Id",
                keyValue: 2,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "OrderStatuses",
                keyColumn: "Id",
                keyValue: 3,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "OrderStatuses",
                keyColumn: "Id",
                keyValue: 4,
                column: "IsActive",
                value: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "OrderStatuses");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "fe0f0881-a76d-4cd6-9a79-3f6adbd5f82f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "fc07cd5e-4d29-4d2c-95ca-b03f3130642e", "AQAAAAIAAYagAAAAEKZ2JSi5kWT1JDnYZ9Nb7/O5QHKIoO91ysmVGz3Xif/iHJvqOgK+JbS3c8J5uGmufQ==", "0b71df16-9b0d-4776-916e-446910f26e0f" });
        }
    }
}
