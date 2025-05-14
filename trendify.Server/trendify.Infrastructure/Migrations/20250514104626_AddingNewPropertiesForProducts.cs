using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace trendify.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddingNewPropertiesForProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsFeatured",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsItNew",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsOnSale",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "fe0f0881-a76d-4cd6-9a79-3f6adbd5f82f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2105f522-0dc6-40ec-a800-d3973e3c76fd", "AQAAAAIAAYagAAAAENfBeyCsvLky0vzJDXXo5Hn//kwDf4FsCimewt9lVXgGbJm4lFWhTiixDKcWJa6vkg==", "3523e3f5-2f0c-4440-bbef-effc3e87d70e" });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 101,
                columns: new[] { "IsFeatured", "IsItNew", "IsOnSale" },
                values: new object[] { false, false, false });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 102,
                columns: new[] { "IsFeatured", "IsItNew", "IsOnSale" },
                values: new object[] { false, false, false });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 103,
                columns: new[] { "IsFeatured", "IsItNew", "IsOnSale" },
                values: new object[] { false, false, false });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 104,
                columns: new[] { "IsFeatured", "IsItNew", "IsOnSale" },
                values: new object[] { false, false, false });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 105,
                columns: new[] { "IsFeatured", "IsItNew", "IsOnSale" },
                values: new object[] { false, false, false });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 106,
                columns: new[] { "IsFeatured", "IsItNew", "IsOnSale" },
                values: new object[] { false, false, false });

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 107,
                columns: new[] { "IsFeatured", "IsItNew", "IsOnSale" },
                values: new object[] { false, false, false });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFeatured",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "IsItNew",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "IsOnSale",
                table: "Products");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "fe0f0881-a76d-4cd6-9a79-3f6adbd5f82f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c2079fe3-bfe5-4023-a426-7d951348334a", "AQAAAAIAAYagAAAAEJLQXHpJL4FEDcIRN7Llp426uw9bFEkkAWaWcWWkD1SDj8tNGedLnPp5Nev2RPtm+w==", "638302eb-ebc5-4d80-b18d-af9c89832cb6" });
        }
    }
}
