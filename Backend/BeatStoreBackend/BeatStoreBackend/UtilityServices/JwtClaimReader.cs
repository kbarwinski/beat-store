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
            var headerContents = contextAccessor.HttpContext?.
                Request.Headers["Authorization"].ToString().Split(" ");
            if(headerContents == null)
            {
                string message = "Header is null.";
                logger.LogError(message);
                throw new ArgumentNullException(nameof(headerContents), message);
            }
            if(headerContents.Length < 2)
            {
                string message = "Provided header content is invalid.";
                logger.LogError(message);
                throw new InvalidOperationException(message);
            }

            var jwt = headerContents[1];
            
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
