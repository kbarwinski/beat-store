using Contracts;
using Entities.DataTransferObjects;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Repositories
{
    public class AuthenticationManager : IAuthenticationManager
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IConfiguration configuration;

        private AppUser appUser;

        public AuthenticationManager(UserManager<AppUser> userManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.configuration = configuration;
        }
        public async Task<bool> ValidateUser(AppUserAuthInputDto userForAuth)
        {
            appUser = await userManager.FindByNameAsync(userForAuth.UserName);
            return appUser != null && await userManager.CheckPasswordAsync(appUser, userForAuth.Password);
        }

        private SigningCredentials GetSigningCredentials()
        {
            var key = Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("SECRET_JWT"));
            var secret = new SymmetricSecurityKey(key);

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
        }

        private async Task<List<Claim>> GetClaims()
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, appUser.Id),
            };

            var roles = await userManager.GetRolesAsync(appUser);
            foreach(var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            return claims;
        }
  
        private JwtSecurityToken GenerateTokenOptions(SigningCredentials signing, List<Claim> claims)
        {
            var jwtSettings = configuration.GetSection("JwtSettings");
            
            var tokenOptions = new JwtSecurityToken
            (
                issuer: jwtSettings.GetSection("validIssuer").Value,
                audience: jwtSettings.GetSection("validAudience").Value,
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings.GetSection("expires").Value)),
                signingCredentials: signing
            );

            return tokenOptions;
        }

        public async Task<string> CreateJwtToken()
        {
            var signingCreds = GetSigningCredentials();
            var claims = await GetClaims();

            var tokenOptions = GenerateTokenOptions(signingCreds, claims);
            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }


    }
}
