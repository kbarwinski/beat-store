using BeatStoreBackend.UtilityServices;
using Microsoft.AspNetCore.Hosting;
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
    public class FileToUrlConverterTests
    {
        private readonly Mock<IWebHostEnvironment> mockEnv;
        private readonly Mock<IHttpContextAccessor> mockAccessor;
        private readonly Mock<IFormFile> mockFile;

        private readonly FileToUrlConverter fileToUrlConverter;

        public FileToUrlConverterTests()
        {
            mockEnv = new Mock<IWebHostEnvironment>();
            mockAccessor = new Mock<IHttpContextAccessor>();
            mockFile = new Mock<IFormFile>();

            fileToUrlConverter = new FileToUrlConverter(mockEnv.Object, mockAccessor.Object);
        }

        [Fact]
        public async Task FileToUrlConverter_FolderNameIsNull_ThrowsArgumentNullException() 
            => await Assert.ThrowsAsync<ArgumentNullException>(() 
                => fileToUrlConverter.SaveFileAsStaticResource(mockFile.Object, null, "test"));

        [Fact]
        public async Task FileToUrlConverter_DestFilenameIsNull_ThrowsArgumentNullException()
            => await Assert.ThrowsAsync<ArgumentNullException>(()
                => fileToUrlConverter.SaveFileAsStaticResource(mockFile.Object, "test", null));

        [Fact]
        public async Task FileToUrlConverter_FileIsEmpty_ThrowsInvalidArgumentException()
        {
            mockFile.SetupGet(x => x.Length).Returns(0);
            mockEnv.SetupGet(x => x.WebRootPath).Returns("/test");

            await Assert.ThrowsAsync<InvalidOperationException>(()
                => fileToUrlConverter.SaveFileAsStaticResource(mockFile.Object, "test", "test"));
        }

        [Fact]
        public async Task FileToUrlConverter_RequestIsNull_ThrowsArgumentNullException()
        {
            mockFile.SetupGet(x => x.Length).Returns(1);
            mockEnv.SetupGet(x => x.WebRootPath).Returns("/test");

            await Assert.ThrowsAsync<ArgumentNullException>(()
                => fileToUrlConverter.SaveFileAsStaticResource(mockFile.Object, "test", "test"));
        }

        [Fact]
        public async Task FileToUrlConverter_CorrectInput_ReturnsProperUrl()
        {
            mockFile.SetupGet(x => x.Length).Returns(1);
            mockEnv.SetupGet(x => x.WebRootPath).Returns("/test");

            var mockRequest = new Mock<HttpRequest>();
            mockRequest.SetupGet(x => x.Scheme).Returns("scheme");
            mockRequest.SetupGet(x => x.Host).Returns(new HostString("host:9999"));
            mockRequest.SetupGet(x => x.PathBase).Returns("/pathbase");

            mockAccessor.SetupGet(x => x.HttpContext.Request).Returns(mockRequest.Object);

            var conversionRes = await fileToUrlConverter.SaveFileAsStaticResource(mockFile.Object, "foldername", "destfilename");

            Assert.Equal("scheme://host:9999/pathbase/foldername/destfilename", conversionRes);
        }
    }
}
