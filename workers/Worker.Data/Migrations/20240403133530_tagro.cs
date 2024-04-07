using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Worker.Data.Migrations
{
    public partial class tagro : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_TagRole_TagRoleId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Roles_TagRole_NameId",
                table: "Roles");

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

            migrationBuilder.CreateTable(
                name: "RoleTagRole",
                columns: table => new
                {
                    NameId = table.Column<int>(type: "int", nullable: false),
                    RolesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleTagRole", x => new { x.NameId, x.RolesId });
                    table.ForeignKey(
                        name: "FK_RoleTagRole_Roles_RolesId",
                        column: x => x.RolesId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoleTagRole_TagRole_NameId",
                        column: x => x.NameId,
                        principalTable: "TagRole",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoleTagRole_RolesId",
                table: "RoleTagRole",
                column: "RolesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoleTagRole");

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
    }
}
