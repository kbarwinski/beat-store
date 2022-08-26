namespace BeatStoreBackend.UtilityServices.MailSender
{
    public interface IMailSender
    {
        Task SendEmailAsync(Message message);
    }
}
