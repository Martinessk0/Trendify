using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace trendify.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemovingLastMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "fe0f0881-a76d-4cd6-9a79-3f6adbd5f82f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c50f2f16-41c8-43aa-8b51-568719a2b018", "AQAAAAIAAYagAAAAEASpmFx/M2W0qB0040erqX7f2W21ctW5Tqqvdrf1YNUOB/vM9OWZyj/Shu4l8SXzfA==", "f93b69f6-fe38-4e45-9845-b3003b638ffb" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "fe0f0881-a76d-4cd6-9a79-3f6adbd5f82f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "2105f522-0dc6-40ec-a800-d3973e3c76fd", "AQAAAAIAAYagAAAAENfBeyCsvLky0vzJDXXo5Hn//kwDf4FsCimewt9lVXgGbJm4lFWhTiixDKcWJa6vkg==", "3523e3f5-2f0c-4440-bbef-effc3e87d70e" });
        }
    }
}
