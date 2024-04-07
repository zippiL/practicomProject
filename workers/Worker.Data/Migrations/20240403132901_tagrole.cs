using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Worker.Data.Migrations
{
    public partial class tagrole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Roles");

            migrationBuilder.AddColumn<int>(
                name: "NameId",
                table: "Roles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TagRoleId",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TagRole",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagRole", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Roles_NameId",
                table: "Roles",
                column: "NameId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_TagRole_NameId",
                table: "Roles",
                column: "NameId",
                principalTable: "TagRole",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_TagRole_TagRoleId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Roles_TagRole_NameId",
                table: "Roles");

            migrationBuilder.DropTable(
                name: "TagRole");

            migrationBuilder.DropIndex(
                name: "IX_Roles_NameId",
                table: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Employees_TagRoleId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "NameId",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "TagRoleId",
                table: "Employees");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Roles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
