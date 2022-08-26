namespace BeatStoreBackend.UtilityServices
{
    public interface IFileToUrlConverter
    {
        string ConvertStringToFilename(string filename);
        Task<string> SaveFileAsStaticResource(IFormFile file, string folderName, string destFilename);
    }
}
