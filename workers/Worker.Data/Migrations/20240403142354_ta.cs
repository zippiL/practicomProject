using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Worker.Data.Migrations
{
    public partial class ta : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_TagRole_TagRoleId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Roles_TagRole_NameId",
                table: "Roles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TagRole",
                table: "TagRole");

            migrationBuilder.RenameTable(
                name: "TagRole",
                newName: "TagRoles");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TagRoles",
                table: "TagRoles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_TagRoles_TagRoleId",
                table: "Employees",
                column: "TagRoleId",
                principalTable: "TagRoles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_TagRoles_NameId",
                table: "Roles",
                column: "NameId",
                principalTable: "TagRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_TagRoles_TagRoleId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Roles_TagRoles_NameId",
                table: "Roles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TagRoles",
                table: "TagRoles");

            migrationBuilder.RenameTable(
                name: "TagRoles",
                newName: "TagRole");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TagRole",
                table: "TagRole",
                column: "Id");

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
