using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace trendify.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddingIsActiveInCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Categories",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "fe0f0881-a76d-4cd6-9a79-3f6adbd5f82f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "fc07cd5e-4d29-4d2c-95ca-b03f3130642e", "AQAAAAIAAYagAAAAEKZ2JSi5kWT1JDnYZ9Nb7/O5QHKIoO91ysmVGz3Xif/iHJvqOgK+JbS3c8J5uGmufQ==", "0b71df16-9b0d-4776-916e-446910f26e0f" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "IsActive",
                value: true);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                column: "IsActive",
                value: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Categories");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "fe0f0881-a76d-4cd6-9a79-3f6adbd5f82f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c50f2f16-41c8-43aa-8b51-568719a2b018", "AQAAAAIAAYagAAAAEASpmFx/M2W0qB0040erqX7f2W21ctW5Tqqvdrf1YNUOB/vM9OWZyj/Shu4l8SXzfA==", "f93b69f6-fe38-4e45-9845-b3003b638ffb" });
        }
    }
}
