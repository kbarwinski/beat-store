using MailKit.Net.Smtp;
using Microsoft.AspNetCore.StaticFiles;
using MimeKit;

namespace BeatStoreBackend.UtilityServices.MailSender
{
    public class MailSender : IMailSender
    {
        private readonly MailConfiguration mailConfig;
        private readonly ILogger<MailSender> logger;

        public MailSender(MailConfiguration configuration, ILogger<MailSender> logger)
        {
            this.mailConfig = configuration;
            this.logger = logger;
        }

        public async Task SendEmailAsync(Message message)
        {
            var mailMessage = new MimeMessage();

            mailMessage.From.Add(new MailboxAddress("BeatStore",mailConfig.From));
            mailMessage.To.Add(message.To);
            mailMessage.Subject = message.Subject;

            var bodyBuilder = new BodyBuilder{ HtmlBody = message.Content };
            if(message.AttachmentPaths!=null && message.AttachmentPaths.Any())
            {
                byte[] fileBytes;
                var contentTypeProvider = new FileExtensionContentTypeProvider();
                foreach(var filePath in message.AttachmentPaths)
                {
                    try
                    {
                        using (var fs = new FileStream(filePath, FileMode.Open))
                        {
                            var ms = new MemoryStream();
                            fs.CopyTo(ms);
                            fileBytes = ms.ToArray();

                            contentTypeProvider.TryGetContentType(filePath, out string? contentType);

                            if (contentType != null)
                                bodyBuilder.Attachments.Add(Path.GetFileName(filePath), fileBytes, ContentType.Parse(contentType));
                        }
                    }
                    catch(Exception ex)
                    {
                        logger.LogWarning(ex.Message);
                    }
                }
            }
            mailMessage.Body = bodyBuilder.ToMessageBody();
            await SendAsync(mailMessage);
        }

        private async Task SendAsync(MimeMessage mailMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(mailConfig.SmtpServer, mailConfig.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    await client.AuthenticateAsync(mailConfig.UserName, mailConfig.Password);
                    await client.SendAsync(mailMessage);
                }
                catch
                {
                    logger.LogError("Sending message failed.");
                    throw;
                }
                finally
                {
                    await client.DisconnectAsync(true);
                    client.Dispose();
                }
            }
        }
    }
}
