namespace BeatStoreBackend.UtilityServices
{
    public interface IJwtClaimReader
    {
        string ReadClaimFromHeader(string claimToRead);
    }
}
