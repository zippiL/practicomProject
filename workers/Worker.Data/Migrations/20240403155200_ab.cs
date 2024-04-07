using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Worker.Data.Migrations
{
    public partial class ab : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Roles_TagRoles_TagRoleId",
                table: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Roles_TagRoleId",
                table: "Roles");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Roles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Roles");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_TagRoleId",
                table: "Roles",
                column: "TagRoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_TagRoles_TagRoleId",
                table: "Roles",
                column: "TagRoleId",
                principalTable: "TagRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
