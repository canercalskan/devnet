using DevNet.Core.Application.DTOs;
using DevNet.Core.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DevNet.JWTTokenService
{
    public class GenerateJwtToken : ITokenService
    {
        private readonly IConfiguration _configuration;
        public GenerateJwtToken(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public  TokenResponseDto GenerateToken(CheckUserResponseDto dto)
        {

            var claims = new List<Claim>();

            if (!string.IsNullOrEmpty(dto.Role))
                claims.Add(new Claim(ClaimTypes.Role, dto.Role));


            claims.Add(new Claim(ClaimTypes.NameIdentifier, dto.Id.ToString()));

            if (!string.IsNullOrEmpty(dto.Email))
                claims.Add(new Claim(ClaimTypes.Email, dto.Email));


            SymmetricSecurityKey jwtToken = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));

            SigningCredentials credentials = new SigningCredentials(jwtToken, SecurityAlgorithms.HmacSha256);

            var expireDate = DateTime.UtcNow.AddDays(7);


            JwtSecurityToken token = new JwtSecurityToken(
                issuer: "https//localhost",
                audience: "https//localhost",
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: expireDate,
                signingCredentials: credentials);

            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();

            return new TokenResponseDto()
            {
                Token = handler.WriteToken(token),
                ExpireDate = expireDate
            };
        }
    }
}
