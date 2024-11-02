using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECommerce.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class entitiesAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AchievementBadge",
                columns: table => new
                {
                    Badge_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Badge_Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AchievementBadge", x => x.Badge_Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Atributi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DataType = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Atributi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HomeVideos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VideoUrl = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomeVideos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Kategoria",
                columns: table => new
                {
                    Kategoria_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriKategorise = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kategoria", x => x.Kategoria_ID);
                });

            migrationBuilder.CreateTable(
                name: "Kompania",
                columns: table => new
                {
                    Kompania_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Kompania_Emri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kompania", x => x.Kompania_ID);
                });

            migrationBuilder.CreateTable(
                name: "TeDhenatBiznesit",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriBiznesit = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmailBiznesit = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NrKontaktues = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InstagramLink = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FacebookLink = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TwitterLink = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LinkedInLink = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeDhenatBiznesit", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Zbritja",
                columns: table => new
                {
                    Zbritja_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ZbritjaEmri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PerqindjaZbritjes = table.Column<int>(type: "int", nullable: false),
                    DataKrijimit = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DataSkadimit = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zbritja", x => x.Zbritja_ID);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    User_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Badge_Id = table.Column<int>(type: "int", nullable: true),
                    ProfilePic = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AspNetUserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.User_Id);
                    table.ForeignKey(
                        name: "FK_User_AchievementBadge_Badge_Id",
                        column: x => x.Badge_Id,
                        principalTable: "AchievementBadge",
                        principalColumn: "Badge_Id");
                    table.ForeignKey(
                        name: "FK_User_AspNetUsers_AspNetUserId",
                        column: x => x.AspNetUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AtributiOption",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OptionValue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AtributiId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AtributiOption", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AtributiOption_Atributi_AtributiId",
                        column: x => x.AtributiId,
                        principalTable: "Atributi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NenKategoria",
                columns: table => new
                {
                    NenKategoria_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriNenkategorise = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Kategoria_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NenKategoria", x => x.NenKategoria_ID);
                    table.ForeignKey(
                        name: "FK_NenKategoria_Kategoria_Kategoria_ID",
                        column: x => x.Kategoria_ID,
                        principalTable: "Kategoria",
                        principalColumn: "Kategoria_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Adresa",
                columns: table => new
                {
                    Adresa_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdresaUserit = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Shteti = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Qyteti = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ZipKodi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Adresa", x => x.Adresa_Id);
                    table.ForeignKey(
                        name: "FK_Adresa_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "User_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Porosia",
                columns: table => new
                {
                    Porosia_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Statusi_Porosise = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MetodaPageses = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotaliProdukteve = table.Column<int>(type: "int", nullable: false),
                    CmimiTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Shteti = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Qyteti = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NrKontaktues = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ZipKodi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DataPorosise = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Porosia", x => x.Porosia_ID);
                    table.ForeignKey(
                        name: "FK_Porosia_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "User_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Wishlist",
                columns: table => new
                {
                    WishlistId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdKlienti = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wishlist", x => x.WishlistId);
                    table.ForeignKey(
                        name: "FK_Wishlist_User_IdKlienti",
                        column: x => x.IdKlienti,
                        principalTable: "User",
                        principalColumn: "User_Id");
                });

            migrationBuilder.CreateTable(
                name: "Produkti",
                columns: table => new
                {
                    Produkti_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriProdukti = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FotoProduktit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PershkrimiProduktit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SasiaNeStok = table.Column<int>(type: "int", nullable: true),
                    CmimiPerCope = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Kompania_ID = table.Column<int>(type: "int", nullable: true),
                    Kategoria_ID = table.Column<int>(type: "int", nullable: true),
                    NenKategoria_ID = table.Column<int>(type: "int", nullable: true),
                    DataVendsojesNeZbritje = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Zbritja_ID = table.Column<int>(type: "int", nullable: true),
                    NeShitje = table.Column<bool>(type: "bit", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produkti", x => x.Produkti_ID);
                    table.ForeignKey(
                        name: "FK_Produkti_Kategoria_Kategoria_ID",
                        column: x => x.Kategoria_ID,
                        principalTable: "Kategoria",
                        principalColumn: "Kategoria_ID");
                    table.ForeignKey(
                        name: "FK_Produkti_Kompania_Kompania_ID",
                        column: x => x.Kompania_ID,
                        principalTable: "Kompania",
                        principalColumn: "Kompania_ID");
                    table.ForeignKey(
                        name: "FK_Produkti_NenKategoria_NenKategoria_ID",
                        column: x => x.NenKategoria_ID,
                        principalTable: "NenKategoria",
                        principalColumn: "NenKategoria_ID");
                    table.ForeignKey(
                        name: "FK_Produkti_Zbritja_Zbritja_ID",
                        column: x => x.Zbritja_ID,
                        principalTable: "Zbritja",
                        principalColumn: "Zbritja_ID");
                });

            migrationBuilder.CreateTable(
                name: "PorosiaItem",
                columns: table => new
                {
                    Item_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SasiaPorositur = table.Column<int>(type: "int", nullable: false),
                    Cmimi = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Porosia_ID = table.Column<int>(type: "int", nullable: false),
                    Produkti_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PorosiaItem", x => x.Item_ID);
                    table.ForeignKey(
                        name: "FK_PorosiaItem_Porosia_Porosia_ID",
                        column: x => x.Porosia_ID,
                        principalTable: "Porosia",
                        principalColumn: "Porosia_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PorosiaItem_Produkti_Produkti_ID",
                        column: x => x.Produkti_ID,
                        principalTable: "Produkti",
                        principalColumn: "Produkti_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProduktiAtributi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AtributiValue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProduktiId = table.Column<int>(type: "int", nullable: false),
                    AtributiId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProduktiAtributi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProduktiAtributi_Atributi_AtributiId",
                        column: x => x.AtributiId,
                        principalTable: "Atributi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProduktiAtributi_Produkti_ProduktiId",
                        column: x => x.ProduktiId,
                        principalTable: "Produkti",
                        principalColumn: "Produkti_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Review",
                columns: table => new
                {
                    Review_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rating = table.Column<int>(type: "int", nullable: true),
                    ReviewContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsEdited = table.Column<bool>(type: "bit", nullable: false),
                    Produkti_ID = table.Column<int>(type: "int", nullable: true),
                    User_Id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Review", x => x.Review_ID);
                    table.ForeignKey(
                        name: "FK_Review_Produkti_Produkti_ID",
                        column: x => x.Produkti_ID,
                        principalTable: "Produkti",
                        principalColumn: "Produkti_ID");
                    table.ForeignKey(
                        name: "FK_Review_User_User_Id",
                        column: x => x.User_Id,
                        principalTable: "User",
                        principalColumn: "User_Id");
                });

            migrationBuilder.CreateTable(
                name: "WishlistItem",
                columns: table => new
                {
                    WishlistItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WishlistId = table.Column<int>(type: "int", nullable: true),
                    Produkti_ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WishlistItem", x => x.WishlistItemId);
                    table.ForeignKey(
                        name: "FK_WishlistItem_Produkti_Produkti_ID",
                        column: x => x.Produkti_ID,
                        principalTable: "Produkti",
                        principalColumn: "Produkti_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WishlistItem_Wishlist_WishlistId",
                        column: x => x.WishlistId,
                        principalTable: "Wishlist",
                        principalColumn: "WishlistId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Adresa_UserId",
                table: "Adresa",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AtributiOption_AtributiId",
                table: "AtributiOption",
                column: "AtributiId");

            migrationBuilder.CreateIndex(
                name: "IX_NenKategoria_Kategoria_ID",
                table: "NenKategoria",
                column: "Kategoria_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Porosia_UserId",
                table: "Porosia",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PorosiaItem_Porosia_ID",
                table: "PorosiaItem",
                column: "Porosia_ID");

            migrationBuilder.CreateIndex(
                name: "IX_PorosiaItem_Produkti_ID",
                table: "PorosiaItem",
                column: "Produkti_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Produkti_Kategoria_ID",
                table: "Produkti",
                column: "Kategoria_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Produkti_Kompania_ID",
                table: "Produkti",
                column: "Kompania_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Produkti_NenKategoria_ID",
                table: "Produkti",
                column: "NenKategoria_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Produkti_Zbritja_ID",
                table: "Produkti",
                column: "Zbritja_ID");

            migrationBuilder.CreateIndex(
                name: "IX_ProduktiAtributi_AtributiId",
                table: "ProduktiAtributi",
                column: "AtributiId");

            migrationBuilder.CreateIndex(
                name: "IX_ProduktiAtributi_ProduktiId",
                table: "ProduktiAtributi",
                column: "ProduktiId");

            migrationBuilder.CreateIndex(
                name: "IX_Review_Produkti_ID",
                table: "Review",
                column: "Produkti_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Review_User_Id",
                table: "Review",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_User_AspNetUserId",
                table: "User",
                column: "AspNetUserId");

            migrationBuilder.CreateIndex(
                name: "IX_User_Badge_Id",
                table: "User",
                column: "Badge_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Wishlist_IdKlienti",
                table: "Wishlist",
                column: "IdKlienti");

            migrationBuilder.CreateIndex(
                name: "IX_WishlistItem_Produkti_ID",
                table: "WishlistItem",
                column: "Produkti_ID");

            migrationBuilder.CreateIndex(
                name: "IX_WishlistItem_WishlistId",
                table: "WishlistItem",
                column: "WishlistId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Adresa");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "AtributiOption");

            migrationBuilder.DropTable(
                name: "HomeVideos");

            migrationBuilder.DropTable(
                name: "PorosiaItem");

            migrationBuilder.DropTable(
                name: "ProduktiAtributi");

            migrationBuilder.DropTable(
                name: "Review");

            migrationBuilder.DropTable(
                name: "TeDhenatBiznesit");

            migrationBuilder.DropTable(
                name: "WishlistItem");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Porosia");

            migrationBuilder.DropTable(
                name: "Atributi");

            migrationBuilder.DropTable(
                name: "Produkti");

            migrationBuilder.DropTable(
                name: "Wishlist");

            migrationBuilder.DropTable(
                name: "Kompania");

            migrationBuilder.DropTable(
                name: "NenKategoria");

            migrationBuilder.DropTable(
                name: "Zbritja");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "Kategoria");

            migrationBuilder.DropTable(
                name: "AchievementBadge");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
