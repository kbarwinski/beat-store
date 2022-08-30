using BeatStoreBackend.UtilityServices;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Tests.UnitTests.Services
{
    public class JwtClaimReaderTests
    {
        private readonly Mock<ILogger<JwtClaimReader>> mockLogger;
        private readonly Mock<IHttpContextAccessor> mockAccessor;

        private readonly JwtClaimReader jwtClaimReader;

        public JwtClaimReaderTests()
        {
            mockLogger = new Mock<ILogger<JwtClaimReader>>();
            mockAccessor = new Mock<IHttpContextAccessor>();

            jwtClaimReader = new JwtClaimReader(mockAccessor.Object, mockLogger.Object);
        }

        [Fact]
        public void JwtClaimReader_HeaderIsNull_ThrowsArgumentNullException()
        {
            Assert.Throws<ArgumentNullException>(() => jwtClaimReader.ReadClaimFromHeader("test"));
        }

        [Fact]
        public void JwtClaimReader_HeaderIsEmpty_ThrowsInvalidOperationException()
        {
            mockAccessor.SetupGet(x => x.HttpContext.Request.Headers["Authorization"]).Returns("");

            Assert.Throws<InvalidOperationException>(() => jwtClaimReader.ReadClaimFromHeader("test"));
        }

        [Fact]
        public void JwtClaimReader_HeaderIsIncomplete_ThrowsInvalidOperationException()
        {
            mockAccessor.SetupGet(x => x.HttpContext.Request.Headers["Authorization"]).Returns("Bearer:");

            Assert.Throws<InvalidOperationException>(() => jwtClaimReader.ReadClaimFromHeader("test"));
        }

        [Fact]
        public void JwtClaimReader_InvalidToken_ThrowsArgumentException()
        {
            mockAccessor.SetupGet(x => x.HttpContext.Request.Headers["Authorization"]).Returns("Bearer: 4h2394vvhr98eF$H(#*");

            Assert.Throws<ArgumentException>(() => jwtClaimReader.ReadClaimFromHeader("test"));
        }

        [Fact]
        public void JwtClaimReader_TokenWithoutSpecifiedClaim_ThrowsInvalidOperationException()
        {
            mockAccessor.SetupGet(x => x.HttpContext.Request.Headers["Authorization"]).Returns("Bearer: " +
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");

            Assert.Throws<InvalidOperationException>(() => jwtClaimReader.ReadClaimFromHeader("test"));
        }

        [Fact]
        public void JwtClaimReader_TokenWithSpecifiedClaim_ReturnsClaimValue()
        {
            mockAccessor.SetupGet(x => x.HttpContext.Request.Headers["Authorization"]).Returns("Bearer: " +
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");

            Assert.Equal("John Doe", jwtClaimReader.ReadClaimFromHeader("name"));
        }
    }
}
