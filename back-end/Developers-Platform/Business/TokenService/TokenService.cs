using Developers_Platform.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Developers_Platform.Business.TokenService
{
    public class TokenService
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        public readonly SymmetricSecurityKey _jwtToken;

        public TokenService(IConfiguration configuration, UserManager<User> userManager)
        {
            _userManager = userManager;
            _configuration = configuration;
            _jwtToken = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));
        }

        public async Task<string> GenerateToken(User User)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, User.FirstName),
                new Claim(ClaimTypes.NameIdentifier, User.Email)
            };

            var roles = await _userManager.GetRolesAsync(User);
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            SigningCredentials signingCredentials = new SigningCredentials(_jwtToken, SecurityAlgorithms.HmacSha512Signature);

            var descriptor = new SecurityTokenDescriptor
            {
                SigningCredentials = signingCredentials,
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(3)
            };
            var handler = new JwtSecurityTokenHandler();

            var token = handler.CreateToken(descriptor);

            return handler.WriteToken(token);
        }
    }
}
