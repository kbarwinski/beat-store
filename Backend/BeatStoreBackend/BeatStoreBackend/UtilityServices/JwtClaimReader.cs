using System.IdentityModel.Tokens.Jwt;

namespace BeatStoreBackend.UtilityServices
{
    public class JwtClaimReader : IJwtClaimReader
    {
        private readonly IHttpContextAccessor contextAccessor;
        private readonly ILogger logger;

        public JwtClaimReader(IHttpContextAccessor contextAccessor, ILogger<JwtClaimReader> logger)
        {
            this.contextAccessor = contextAccessor;
            this.logger = logger;
        }

        public string ReadClaimFromHeader(string claimToRead)
        {
            var jwt = contextAccessor.HttpContext?.
                Request.Headers["Authorization"].
                ToString().Split(" ")[1];
            
            if (string.IsNullOrEmpty(jwt))
            {
                string message = "Authorization header is empty.";
                logger.LogError(message);
                throw new InvalidOperationException(message);
            }
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(jwt);

            string claim = jwtToken.Claims.First(claim => claim.Type == claimToRead).Value;
            if (string.IsNullOrEmpty(jwt))
            {
                string message = "Token does not contain specified claim.";
                logger.LogError(message);
                throw new InvalidOperationException(message);
            }

            return claim;

        }
    }
}
