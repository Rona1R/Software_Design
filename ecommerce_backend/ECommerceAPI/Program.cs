using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using ECommerce.Infrastructure.BusinessModule.DependencyInjection;
using ECommerce.Infrastructure.KataloguModule.DependencyInjection;
using ECommerce.Infrastructure.OrdersModule.DependencyInjection;
using ECommerce.Infrastructure.ProduktetModule.DependencyInjection;
using ECommerce.Infrastructure.UsersModule.DependencyInjection;
using ECommerceAPI.UsersModule.Security;
using ECommerce.Infrastructure.Data;
using ECommerce.Infrastructure.Configurations;
using ECommerceAPI.BusinessModule.ReportsFactory;
using ECommerce.Application.OrdersModule.Interfaces;
using ECommerce.Application.OrdersModule.Services.PaymentServiceAdapters;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        //builder.Services.AddDbContext<ECommerceDBContext>(options =>
        //{
        //    options.UseSqlServer(builder.Configuration.GetConnectionString("Conn"));
        //}, ServiceLifetime.Scoped);

        builder.Services.AddDbContext(builder.Configuration);


        builder.Services.AddScoped<TokenService>();
        builder.Services.RegisterUsersServices();
        builder.Services.RegisterProduktetServices();
        builder.Services.RegisterOrdersServices();
        builder.Services.RegisterKataloguServices();
        builder.Services.RegisterBusinessServices();

        builder.Services.AddSingleton<ReportGeneratorFactory>();
        builder.Services.AddScoped<IPaymentServiceAdapter, StripePaymentServiceAdapter>();


        builder.Services.AddControllers();
        builder.Services.AddHttpContextAccessor();

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "JWT API", Version = "v1" });
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "JWT Authorization header using the Bearer scheme."
            });
            c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
         });
        });

        builder.Services.AddCors(opt =>
        {
            opt.AddPolicy(name: "CorsPolicy", builder =>
            {
                builder.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
            });
        });

        builder.Services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            options.JsonSerializerOptions.WriteIndented = true;
        });

        builder.Services.AddControllers().AddJsonOptions(x =>
        x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);


        builder.Services.AddIdentity<IdentityUser, IdentityRole>()
          .AddEntityFrameworkStores<ECommerceDBContext>()
          .AddDefaultTokenProviders();

       builder.Services.Configure<IdentityOptions>(options =>
        {
            options.Password.RequireDigit = true;
            options.Password.RequireLowercase = true;
            options.Password.RequireUppercase = true;
            options.Password.RequireNonAlphanumeric = true;
            options.Password.RequiredLength = 6;
            options.Password.RequiredUniqueChars = 1; // Minimum number of unique characters in the password
        });

     
        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
          
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("JwtConfig:Secret").Value))
            };
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseCors("CorsPolicy");

        app.UseAuthentication();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}