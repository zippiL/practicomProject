using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Worker.Data.Migrations
{
    public partial class a : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Roles_TagRoles_NameId",
                table: "Roles");

            migrationBuilder.RenameColumn(
                name: "NameId",
                table: "Roles",
                newName: "TagRoleId");

            migrationBuilder.RenameIndex(
                name: "IX_Roles_NameId",
                table: "Roles",
                newName: "IX_Roles_TagRoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_TagRoles_TagRoleId",
                table: "Roles",
                column: "TagRoleId",
                principalTable: "TagRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Roles_TagRoles_TagRoleId",
                table: "Roles");

            migrationBuilder.RenameColumn(
                name: "TagRoleId",
                table: "Roles",
                newName: "NameId");

            migrationBuilder.RenameIndex(
                name: "IX_Roles_TagRoleId",
                table: "Roles",
                newName: "IX_Roles_NameId");

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_TagRoles_NameId",
                table: "Roles",
                column: "NameId",
                principalTable: "TagRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
