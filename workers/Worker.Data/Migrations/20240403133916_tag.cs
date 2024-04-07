using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Worker.Data.Migrations
{
    public partial class tag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TagRoleId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_TagRoleId",
                table: "Employees",
                column: "TagRoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_TagRole_TagRoleId",
                table: "Employees",
                column: "TagRoleId",
                principalTable: "TagRole",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_TagRole_TagRoleId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_TagRoleId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "TagRoleId",
                table: "Employees");
        }
    }
}
