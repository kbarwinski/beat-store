using System.Text;

namespace BeatStoreBackend.UtilityServices
{
    public class FileToUrlConverter : IFileToUrlConverter
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IHttpContextAccessor httpContextAccessor;

        public FileToUrlConverter(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.httpContextAccessor = httpContextAccessor;
        }

        public async Task<string> SaveFileAsStaticResource(IFormFile file, string folderName, string destFilename)
        {
            string folderPath = Path.Combine(webHostEnvironment.WebRootPath, folderName);
            Directory.CreateDirectory(folderPath);
            if (file.Length > 0)
            {
                string filenameWithExtension = $"{destFilename}{Path.GetExtension(file.FileName)}";
                string fullFilePath = Path.Combine(folderPath, filenameWithExtension);

                using (Stream fileStream = new FileStream(fullFilePath, FileMode.Create))
                    await file.CopyToAsync(fileStream);

                var request = httpContextAccessor.HttpContext?.Request;
                if (request == null)
                    throw new InvalidOperationException("No corresponding request found.");

                return $"{request.Scheme}://{request.Host}{request.PathBase.ToUriComponent()}/{folderName}/{filenameWithExtension}";
            }
            else
                throw new InvalidOperationException("File is empty.");

        }

        public string ConvertStringToFilename(string filename)
        {
            StringBuilder filenameBuilder = new StringBuilder(filename);
            foreach(char c in Path.GetInvalidFileNameChars())
            {
                filenameBuilder.Replace(c, '_');
            }
            return filenameBuilder.ToString();
        }
    }
}
