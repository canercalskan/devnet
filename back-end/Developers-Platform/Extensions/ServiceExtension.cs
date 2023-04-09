using Developers_Platform.Business.TokenService;
using Developers_Platform.DataAccess;
using Developers_Platform.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Developers_Platform.Extensions
{
    public static class ServiceExtensions
    {
        /// <summary>
        /// Extension Method to Add Configuration Services
        /// </summary>
        /// <param name="services"></param>
        /// <returns>A reference to this object after the operation has completed</returns>
        public static IServiceCollection AddCustomServices(this IServiceCollection services)
        {

            var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET");


            services.AddDbContext<DatabaseContext>(options =>
            {
                options.UseNpgsql(@"Server=91.107.194.181;Port=5432;Database=postgres;User Id=postgres;Password=Ukebu1riz_gl;");
            });
            services.AddIdentity<User, IdentityRole>(setupAction =>
            {
                setupAction.User.RequireUniqueEmail = true;
                setupAction.Password.RequireNonAlphanumeric = false;
                setupAction.Password.RequireDigit = false;
                setupAction.Password.RequiredLength = 4;
                setupAction.Password.RequireLowercase = false;
                setupAction.Password.RequireUppercase = false;
            })
             .AddEntityFrameworkStores<DatabaseContext>()
             .AddSignInManager<SignInManager<User>>()
             .AddRoles<IdentityRole>()
             .AddRoleManager<RoleManager<IdentityRole>>()
             .AddRoleValidator<RoleValidator<IdentityRole>>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
                    ValidateIssuerSigningKey = true,
                    ValidateAudience = false,
                    ValidateIssuer = false
                };
            });
            services.AddScoped<TokenService>();

            return services;
        }
    }
}
