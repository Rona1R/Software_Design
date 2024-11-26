using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECommerce.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Changes_in_nullability : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produkti_Kategoria_Kategoria_ID",
                table: "Produkti");

            migrationBuilder.DropForeignKey(
                name: "FK_Produkti_Kompania_Kompania_ID",
                table: "Produkti");

            migrationBuilder.DropForeignKey(
                name: "FK_Produkti_NenKategoria_NenKategoria_ID",
                table: "Produkti");

            migrationBuilder.DropForeignKey(
                name: "FK_Review_Produkti_Produkti_ID",
                table: "Review");

            migrationBuilder.DropForeignKey(
                name: "FK_Review_User_User_Id",
                table: "Review");

            migrationBuilder.DropForeignKey(
                name: "FK_Wishlist_User_IdKlienti",
                table: "Wishlist");

            migrationBuilder.DropForeignKey(
                name: "FK_WishlistItem_Wishlist_WishlistId",
                table: "WishlistItem");

            migrationBuilder.AlterColumn<string>(
                name: "ZbritjaEmri",
                table: "Zbritja",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataSkadimit",
                table: "Zbritja",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataKrijimit",
                table: "Zbritja",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "WishlistId",
                table: "WishlistItem",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "IdKlienti",
                table: "Wishlist",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "User_Id",
                table: "Review",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ReviewContent",
                table: "Review",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Rating",
                table: "Review",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Produkti_ID",
                table: "Review",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Review",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SasiaNeStok",
                table: "Produkti",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PershkrimiProduktit",
                table: "Produkti",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "NenKategoria_ID",
                table: "Produkti",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "NeShitje",
                table: "Produkti",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Kompania_ID",
                table: "Produkti",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Kategoria_ID",
                table: "Produkti",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FotoProduktit",
                table: "Produkti",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "EmriProdukti",
                table: "Produkti",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "CmimiPerCope",
                table: "Produkti",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "EmriNenkategorise",
                table: "NenKategoria",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Kompania_Emri",
                table: "Kompania",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "EmriKategorise",
                table: "Kategoria",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Badge_Name",
                table: "AchievementBadge",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Produkti_Kategoria_Kategoria_ID",
                table: "Produkti",
                column: "Kategoria_ID",
                principalTable: "Kategoria",
                principalColumn: "Kategoria_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Produkti_Kompania_Kompania_ID",
                table: "Produkti",
                column: "Kompania_ID",
                principalTable: "Kompania",
                principalColumn: "Kompania_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Produkti_NenKategoria_NenKategoria_ID",
                table: "Produkti",
                column: "NenKategoria_ID",
                principalTable: "NenKategoria",
                principalColumn: "NenKategoria_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Review_Produkti_Produkti_ID",
                table: "Review",
                column: "Produkti_ID",
                principalTable: "Produkti",
                principalColumn: "Produkti_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Review_User_User_Id",
                table: "Review",
                column: "User_Id",
                principalTable: "User",
                principalColumn: "User_Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Wishlist_User_IdKlienti",
                table: "Wishlist",
                column: "IdKlienti",
                principalTable: "User",
                principalColumn: "User_Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WishlistItem_Wishlist_WishlistId",
                table: "WishlistItem",
                column: "WishlistId",
                principalTable: "Wishlist",
                principalColumn: "WishlistId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produkti_Kategoria_Kategoria_ID",
                table: "Produkti");

            migrationBuilder.DropForeignKey(
                name: "FK_Produkti_Kompania_Kompania_ID",
                table: "Produkti");

            migrationBuilder.DropForeignKey(
                name: "FK_Produkti_NenKategoria_NenKategoria_ID",
                table: "Produkti");

            migrationBuilder.DropForeignKey(
                name: "FK_Review_Produkti_Produkti_ID",
                table: "Review");

            migrationBuilder.DropForeignKey(
                name: "FK_Review_User_User_Id",
                table: "Review");

            migrationBuilder.DropForeignKey(
                name: "FK_Wishlist_User_IdKlienti",
                table: "Wishlist");

            migrationBuilder.DropForeignKey(
                name: "FK_WishlistItem_Wishlist_WishlistId",
                table: "WishlistItem");

            migrationBuilder.AlterColumn<string>(
                name: "ZbritjaEmri",
                table: "Zbritja",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataSkadimit",
                table: "Zbritja",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataKrijimit",
                table: "Zbritja",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<int>(
                name: "WishlistId",
                table: "WishlistItem",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "IdKlienti",
                table: "Wishlist",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "User_Id",
                table: "Review",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "ReviewContent",
                table: "Review",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "Rating",
                table: "Review",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Produkti_ID",
                table: "Review",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Review",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<int>(
                name: "SasiaNeStok",
                table: "Produkti",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "PershkrimiProduktit",
                table: "Produkti",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "NenKategoria_ID",
                table: "Produkti",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<bool>(
                name: "NeShitje",
                table: "Produkti",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<int>(
                name: "Kompania_ID",
                table: "Produkti",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Kategoria_ID",
                table: "Produkti",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "FotoProduktit",
                table: "Produkti",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "EmriProdukti",
                table: "Produkti",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<decimal>(
                name: "CmimiPerCope",
                table: "Produkti",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<string>(
                name: "EmriNenkategorise",
                table: "NenKategoria",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Kompania_Emri",
                table: "Kompania",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "EmriKategorise",
                table: "Kategoria",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Badge_Name",
                table: "AchievementBadge",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddForeignKey(
                name: "FK_Produkti_Kategoria_Kategoria_ID",
                table: "Produkti",
                column: "Kategoria_ID",
                principalTable: "Kategoria",
                principalColumn: "Kategoria_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Produkti_Kompania_Kompania_ID",
                table: "Produkti",
                column: "Kompania_ID",
                principalTable: "Kompania",
                principalColumn: "Kompania_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Produkti_NenKategoria_NenKategoria_ID",
                table: "Produkti",
                column: "NenKategoria_ID",
                principalTable: "NenKategoria",
                principalColumn: "NenKategoria_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Review_Produkti_Produkti_ID",
                table: "Review",
                column: "Produkti_ID",
                principalTable: "Produkti",
                principalColumn: "Produkti_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Review_User_User_Id",
                table: "Review",
                column: "User_Id",
                principalTable: "User",
                principalColumn: "User_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Wishlist_User_IdKlienti",
                table: "Wishlist",
                column: "IdKlienti",
                principalTable: "User",
                principalColumn: "User_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WishlistItem_Wishlist_WishlistId",
                table: "WishlistItem",
                column: "WishlistId",
                principalTable: "Wishlist",
                principalColumn: "WishlistId");
        }
    }
}
