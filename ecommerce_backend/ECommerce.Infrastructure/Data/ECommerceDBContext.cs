using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ECommerce.Domain.BusinessModule.Entities;
using ECommerce.Domain.KataloguModule.Entities;
using ECommerce.Domain.ProduktetModule.Entities;
using ECommerce.Domain.OrdersModule.Entities;
using ECommerce.Domain.UsersModule.Entities;


namespace ECommerceAPI.Data
{
    public class ECommerceDBContext:IdentityDbContext<IdentityUser, IdentityRole, string>
    {
        public ECommerceDBContext(DbContextOptions<ECommerceDBContext> options) : base(options) { 
        }
        public ECommerceDBContext() { }

        public DbSet<User> User { get; set; }
        public DbSet<Kompania> Kompania { get; set; }   

        public DbSet<Kategoria> Kategoria { get; set; }

        public DbSet<NenKategoria> NenKategoria { get; set; }  

        public DbSet<Zbritja> Zbritja { get; set; }

        public DbSet<Produkti> Produkti { get; set; }


        public DbSet<Wishlist> Wishlist { get; set; }

        public DbSet<WishlistItem> WishlistItem { get; set; }
        public DbSet<Review> Review { get; set; } = default!;
        public DbSet<AchievementBadge> AchievementBadge { get; set; } = default!;
      
        public DbSet<Porosia> Porosia {  get; set; }   

        public DbSet<PorosiaItem> PorosiaItem { get; set; } 

        public DbSet<Adresa> Adresa { get; set; } 

        public DbSet<TeDhenatBiznesit> TeDhenatBiznesit { get; set; }

        public DbSet<HomeVideos> HomeVideos { get; set; }   

        public DbSet<Atributi> Atributi { get; set; }   

        public DbSet<ProduktiAtributi> ProduktiAtributi { get; set; }

        public DbSet<AtributiOption> AtributiOption { get; set; }  
    }
}
