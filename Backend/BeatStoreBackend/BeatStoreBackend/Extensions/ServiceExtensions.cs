using AspNetCoreRateLimit;
using AutoMapper;
using BeatStoreBackend.MapperProfiles;
using BeatStoreBackend.UtilityServices;
using BeatStoreBackend.UtilityServices.MailSender;
using Contracts;
using Entities;
using Entities.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Repositories;
using System.Text;

namespace BeatStoreBackend.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCORS(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });
        }

        public static void ConfigureSQLContext(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<RepositoryContext>(opts =>
            {
                opts.UseNpgsql(configuration.GetConnectionString("sqlConnection"), builder =>
                {
                    builder.MigrationsAssembly("BeatStoreBackend");
                });
            });
        }

        public static void ConfigureRepositoryManager(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryManager, RepositoryManager>();
        }

        public static void ConfigureAutoMapper(this IServiceCollection services)
        {
            var config = new MapperConfiguration(config =>
            {
                config.AddProfile(new BaseProfile());
            });

            var mapper = config.CreateMapper();

            services.AddSingleton(mapper);
        }

        public static void ConfigureCustomServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IFileToUrlConverter, FileToUrlConverter>();
            services.AddScoped<IAuthenticationManager, AuthenticationManager>();
            services.AddScoped<IJwtClaimReader, JwtClaimReader>();

            var mailConfig = configuration.GetSection("EmailConfiguration").Get<MailConfiguration>();
            services.AddSingleton(mailConfig);

            services.AddScoped<IMailSender, MailSender>();
        }

        public static void ConfigureIdentity(this IServiceCollection services)
        {
            var builder = services.AddIdentityCore<AppUser>(o =>
            {
                o.Password.RequireDigit = false;
                o.Password.RequireLowercase = false;
                o.Password.RequireUppercase = false;
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequiredLength = 5;
                o.User.RequireUniqueEmail = true;
            });

            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), builder.Services);
            builder.AddEntityFrameworkStores<RepositoryContext>().AddDefaultTokenProviders();
        }

        public static void ConfigureJWT(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtSettings = configuration.GetSection("JwtSettings");
            var secretKey = Environment.GetEnvironmentVariable("SECRET_JWT");

            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = jwtSettings.GetSection("validIssuer").Value,
                    ValidAudience = jwtSettings.GetSection("validAudience").Value,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                };
            });
        }

        public static void ConfigureRateLimiter(this IServiceCollection services)
        {
            var rateLimitRules = new List<RateLimitRule>
            {
                new RateLimitRule
                {
                    Endpoint = "get:/api/audioitems",
                    Limit = 500,
                    Period = "24h"
                },
                new RateLimitRule
                {
                    Endpoint = "post:/api/orders",
                    Limit = 50,
                    Period = "24h",
                },
            };

            services.Configure<IpRateLimitOptions>(opt =>
            {
                opt.GeneralRules = rateLimitRules;
            });

            services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();
            services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
            services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
            services.AddSingleton<IProcessingStrategy, AsyncKeyLockProcessingStrategy>();


        }
    }
}
