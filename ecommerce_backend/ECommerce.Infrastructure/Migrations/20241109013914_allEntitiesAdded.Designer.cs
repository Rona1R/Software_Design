﻿// <auto-generated />
using System;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ECommerce.Infrastructure.Migrations
{
    [DbContext(typeof(ECommerceDBContext))]
    [Migration("20241109013914_allEntitiesAdded")]
    partial class allEntitiesAdded
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ECommerce.Domain.BusinessModule.Entities.HomeVideos", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("VideoUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("HomeVideos");
                });

            modelBuilder.Entity("ECommerce.Domain.BusinessModule.Entities.TeDhenatBiznesit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("EmailBiznesit")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmriBiznesit")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FacebookLink")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("InstagramLink")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LinkedInLink")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NrKontaktues")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TwitterLink")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("TeDhenatBiznesit");
                });

            modelBuilder.Entity("ECommerce.Domain.KataloguModule.Entities.Kategoria", b =>
                {
                    b.Property<int>("Kategoria_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Kategoria_ID"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("EmriKategorise")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pershkrimi")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Kategoria_ID");

                    b.ToTable("Kategoria");
                });

            modelBuilder.Entity("ECommerce.Domain.KataloguModule.Entities.Kompania", b =>
                {
                    b.Property<int>("Kompania_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Kompania_ID"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Kompania_Emri")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Kompania_ID");

                    b.ToTable("Kompania");
                });

            modelBuilder.Entity("ECommerce.Domain.KataloguModule.Entities.NenKategoria", b =>
                {
                    b.Property<int>("NenKategoria_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("NenKategoria_ID"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("EmriNenkategorise")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Kategoria_ID")
                        .HasColumnType("int");

                    b.HasKey("NenKategoria_ID");

                    b.HasIndex("Kategoria_ID");

                    b.ToTable("NenKategoria");
                });

            modelBuilder.Entity("ECommerce.Domain.OrdersModule.Entities.Porosia", b =>
                {
                    b.Property<int>("Porosia_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Porosia_ID"));

                    b.Property<string>("Adresa")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("CmimiTotal")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("DataPorosise")
                        .HasColumnType("datetime2");

                    b.Property<string>("MetodaPageses")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NrKontaktues")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Qyteti")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Shteti")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Statusi_Porosise")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TotaliProdukteve")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("ZipKodi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Porosia_ID");

                    b.HasIndex("UserId");

                    b.ToTable("Porosia");
                });

            modelBuilder.Entity("ECommerce.Domain.OrdersModule.Entities.PorosiaItem", b =>
                {
                    b.Property<int>("Item_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Item_ID"));

                    b.Property<decimal>("Cmimi")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("Porosia_ID")
                        .HasColumnType("int");

                    b.Property<int>("Produkti_ID")
                        .HasColumnType("int");

                    b.Property<int>("SasiaPorositur")
                        .HasColumnType("int");

                    b.HasKey("Item_ID");

                    b.HasIndex("Porosia_ID");

                    b.HasIndex("Produkti_ID");

                    b.ToTable("PorosiaItem");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.AchievementBadge", b =>
                {
                    b.Property<int>("Badge_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Badge_Id"));

                    b.Property<string>("Badge_Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Badge_Id");

                    b.ToTable("AchievementBadge");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.Atributi", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("DataType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Atributi");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.AtributiOption", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AtributiId")
                        .HasColumnType("int");

                    b.Property<string>("OptionValue")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AtributiId");

                    b.ToTable("AtributiOption");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.Produkti", b =>
                {
                    b.Property<int>("Produkti_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Produkti_ID"));

                    b.Property<decimal?>("CmimiPerCope")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataVendsojesNeZbritje")
                        .HasColumnType("datetime2");

                    b.Property<string>("EmriProdukti")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FotoProduktit")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Kategoria_ID")
                        .HasColumnType("int");

                    b.Property<int?>("Kompania_ID")
                        .HasColumnType("int");

                    b.Property<bool?>("NeShitje")
                        .HasColumnType("bit");

                    b.Property<int?>("NenKategoria_ID")
                        .HasColumnType("int");

                    b.Property<string>("PershkrimiProduktit")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("SasiaNeStok")
                        .HasColumnType("int");

                    b.Property<int?>("Zbritja_ID")
                        .HasColumnType("int");

                    b.HasKey("Produkti_ID");

                    b.HasIndex("Kategoria_ID");

                    b.HasIndex("Kompania_ID");

                    b.HasIndex("NenKategoria_ID");

                    b.HasIndex("Zbritja_ID");

                    b.ToTable("Produkti");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.ProduktiAtributi", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AtributiId")
                        .HasColumnType("int");

                    b.Property<string>("AtributiValue")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ProduktiId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AtributiId");

                    b.HasIndex("ProduktiId");

                    b.ToTable("ProduktiAtributi");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.Review", b =>
                {
                    b.Property<int>("Review_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Review_ID"));

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsEdited")
                        .HasColumnType("bit");

                    b.Property<int?>("Produkti_ID")
                        .HasColumnType("int");

                    b.Property<int?>("Rating")
                        .HasColumnType("int");

                    b.Property<string>("ReviewContent")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("User_Id")
                        .HasColumnType("int");

                    b.HasKey("Review_ID");

                    b.HasIndex("Produkti_ID");

                    b.HasIndex("User_Id");

                    b.ToTable("Review");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.Wishlist", b =>
                {
                    b.Property<int>("WishlistId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("WishlistId"));

                    b.Property<int?>("IdKlienti")
                        .HasColumnType("int");

                    b.HasKey("WishlistId");

                    b.HasIndex("IdKlienti");

                    b.ToTable("Wishlist");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.WishlistItem", b =>
                {
                    b.Property<int>("WishlistItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("WishlistItemId"));

                    b.Property<int>("Produkti_ID")
                        .HasColumnType("int");

                    b.Property<int?>("WishlistId")
                        .HasColumnType("int");

                    b.HasKey("WishlistItemId");

                    b.HasIndex("Produkti_ID");

                    b.HasIndex("WishlistId");

                    b.ToTable("WishlistItem");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.Zbritja", b =>
                {
                    b.Property<int>("Zbritja_ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Zbritja_ID"));

                    b.Property<DateTime?>("DataKrijimit")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DataSkadimit")
                        .HasColumnType("datetime2");

                    b.Property<int>("PerqindjaZbritjes")
                        .HasColumnType("int");

                    b.Property<string>("ZbritjaEmri")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Zbritja_ID");

                    b.ToTable("Zbritja");
                });

            modelBuilder.Entity("ECommerce.Domain.UsersModule.Entities.Adresa", b =>
                {
                    b.Property<int>("Adresa_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Adresa_Id"));

                    b.Property<string>("AdresaUserit")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDefault")
                        .HasColumnType("bit");

                    b.Property<string>("Qyteti")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Shteti")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("ZipKodi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Adresa_Id");

                    b.HasIndex("UserId");

                    b.ToTable("Adresa");
                });

            modelBuilder.Entity("ECommerce.Domain.UsersModule.Entities.User", b =>
                {
                    b.Property<int>("User_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("User_Id"));

                    b.Property<string>("AspNetUserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<int?>("Badge_Id")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("ProfilePic")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("User_Id");

                    b.HasIndex("AspNetUserId");

                    b.HasIndex("Badge_Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("ECommerce.Domain.KataloguModule.Entities.NenKategoria", b =>
                {
                    b.HasOne("ECommerce.Domain.KataloguModule.Entities.Kategoria", "Kategoria")
                        .WithMany("NenKategoria")
                        .HasForeignKey("Kategoria_ID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Kategoria");
                });

            modelBuilder.Entity("ECommerce.Domain.OrdersModule.Entities.Porosia", b =>
                {
                    b.HasOne("ECommerce.Domain.UsersModule.Entities.User", "User")
                        .WithMany("Porosia")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("ECommerce.Domain.OrdersModule.Entities.PorosiaItem", b =>
                {
                    b.HasOne("ECommerce.Domain.OrdersModule.Entities.Porosia", "Porosia")
                        .WithMany("PorosiaItem")
                        .HasForeignKey("Porosia_ID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ECommerce.Domain.ProduktetModule.Entities.Produkti", "Produkti")
                        .WithMany("PorosiaItem")
                        .HasForeignKey("Produkti_ID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Porosia");

                    b.Navigation("Produkti");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.AtributiOption", b =>
                {
                    b.HasOne("ECommerce.Domain.ProduktetModule.Entities.Atributi", "Atributi")
                        .WithMany("AtributiOption")
                        .HasForeignKey("AtributiId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Atributi");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.Produkti", b =>
                {
                    b.HasOne("ECommerce.Domain.KataloguModule.Entities.Kategoria", "Kategoria")
                        .WithMany("Produkti")
                        .HasForeignKey("Kategoria_ID");

                    b.HasOne("ECommerce.Domain.KataloguModule.Entities.Kompania", "Kompania")
                        .WithMany("Produkti")
                        .HasForeignKey("Kompania_ID");

                    b.HasOne("ECommerce.Domain.KataloguModule.Entities.NenKategoria", "NenKategoria")
                        .WithMany("Produkti")
                        .HasForeignKey("NenKategoria_ID");

                    b.HasOne("ECommerce.Domain.ProduktetModule.Entities.Zbritja", "Zbritja")
                        .WithMany("Produkti")
                        .HasForeignKey("Zbritja_ID");

                    b.Navigation("Kategoria");

                    b.Navigation("Kompania");

                    b.Navigation("NenKategoria");

                    b.Navigation("Zbritja");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.ProduktiAtributi", b =>
                {
                    b.HasOne("ECommerce.Domain.ProduktetModule.Entities.Atributi", "Atributi")
                        .WithMany("ProduktiAtributi")
                        .HasForeignKey("AtributiId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ECommerce.Domain.ProduktetModule.Entities.Produkti", "Produkti")
                        .WithMany("ProduktiAtributi")
                        .HasForeignKey("ProduktiId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Atributi");

                    b.Navigation("Produkti");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.Review", b =>
                {
                    b.HasOne("ECommerce.Domain.ProduktetModule.Entities.Produkti", "Produkti")
                        .WithMany("Review")
                        .HasForeignKey("Produkti_ID");

                    b.HasOne("ECommerce.Domain.UsersModule.Entities.User", "User")
                        .WithMany("Review")
                        .HasForeignKey("User_Id");

                    b.Navigation("Produkti");

                    b.Navigation("User");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.Wishlist", b =>
                {
                    b.HasOne("ECommerce.Domain.UsersModule.Entities.User", "Klienti")
                        .WithMany("Wishlist")
                        .HasForeignKey("IdKlienti");

                    b.Navigation("Klienti");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.WishlistItem", b =>
                {
                    b.HasOne("ECommerce.Domain.ProduktetModule.Entities.Produkti", "Produkti")
                        .WithMany("WishlistItem")
                        .HasForeignKey("Produkti_ID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ECommerce.Domain.ProduktetModule.Entities.Wishlist", "Wishlist")
                        .WithMany("WishlistItem")
                        .HasForeignKey("WishlistId");

                    b.Navigation("Produkti");

                    b.Navigation("Wishlist");
                });

            modelBuilder.Entity("ECommerce.Domain.UsersModule.Entities.Adresa", b =>
                {
                    b.HasOne("ECommerce.Domain.UsersModule.Entities.User", "User")
                        .WithMany("Adresa")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("ECommerce.Domain.UsersModule.Entities.User", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", "AspNetUser")
                        .WithMany()
                        .HasForeignKey("AspNetUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ECommerce.Domain.ProduktetModule.Entities.AchievementBadge", "AchievementBadge")
                        .WithMany("Users")
                        .HasForeignKey("Badge_Id");

                    b.Navigation("AchievementBadge");

                    b.Navigation("AspNetUser");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ECommerce.Domain.KataloguModule.Entities.Kategoria", b =>
                {
                    b.Navigation("NenKategoria");

                    b.Navigation("Produkti");
                });

            modelBuilder.Entity("ECommerce.Domain.KataloguModule.Entities.Kompania", b =>
                {
                    b.Navigation("Produkti");
                });

            modelBuilder.Entity("ECommerce.Domain.KataloguModule.Entities.NenKategoria", b =>
                {
                    b.Navigation("Produkti");
                });

            modelBuilder.Entity("ECommerce.Domain.OrdersModule.Entities.Porosia", b =>
                {
                    b.Navigation("PorosiaItem");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.AchievementBadge", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.Atributi", b =>
                {
                    b.Navigation("AtributiOption");

                    b.Navigation("ProduktiAtributi");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.Produkti", b =>
                {
                    b.Navigation("PorosiaItem");

                    b.Navigation("ProduktiAtributi");

                    b.Navigation("Review");

                    b.Navigation("WishlistItem");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.Wishlist", b =>
                {
                    b.Navigation("WishlistItem");
                });

            modelBuilder.Entity("ECommerce.Domain.ProduktetModule.Entities.Zbritja", b =>
                {
                    b.Navigation("Produkti");
                });

            modelBuilder.Entity("ECommerce.Domain.UsersModule.Entities.User", b =>
                {
                    b.Navigation("Adresa");

                    b.Navigation("Porosia");

                    b.Navigation("Review");

                    b.Navigation("Wishlist");
                });
#pragma warning restore 612, 618
        }
    }
}