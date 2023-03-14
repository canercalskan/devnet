using Azure.Core;
using Azure.Identity;
using BCrypt.Net;
using Developers_Platform.DataAccess;
using Developers_Platform.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;

namespace Developers_Platform.Business.AuthService
{
    public class AuthService : IAuthService

    {
        public readonly IConfiguration _configuration;
        public AuthService (IConfiguration Configuration)
       {
            _configuration = Configuration;

        }
        public async Task SignUp(User user)
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            using (DatabaseContext context = new DatabaseContext())
            {
                if (!context.Users.Any(u => u.Email == user.Email))
                {
                    var addedEntity = context.Entry(user);
                    addedEntity.State = EntityState.Added;                 
                    await context.SaveChangesAsync();
                  
                }
            }
        }
        public bool EmailChecker(string Email)
        {
            using (DatabaseContext context = new DatabaseContext())
            {
                if (!context.Users.Any(u => u.Email == Email))

                {
                    return false;
                }
            }
            return true;
        }

        public string Login(UserForLoginDto userForLoginDto )
        {
            
            using (DatabaseContext context = new DatabaseContext())
            {
                var userToCheck = context.Users.FirstOrDefault(u=>u.Email == userForLoginDto.Email);

                if (!context.Users.Any(u=>u.Email == userForLoginDto.Email))
                {
                    return "User not found.";
                }

                if (BCrypt.Net.BCrypt.Verify(userForLoginDto.Password,userToCheck.Password ) == false)
                {
                    return "Wrong Password."; 
                }
                string token = CreateToken(userForLoginDto.Email);

                return token;   
            }
        }
        private string CreateToken(string Email)
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Name, Email)                
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
