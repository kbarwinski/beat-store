using MimeKit;

namespace BeatStoreBackend.UtilityServices.MailSender
{
    public class Message
    {
        public MailboxAddress To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public List<string>? AttachmentPaths { get; set; }

        public Message(MailboxAddress to, string subject, string content, List<string>? attachmentPaths)
        {
            To = to;
            Subject = subject;
            Content = content;
            AttachmentPaths = attachmentPaths;
        }
    }

}
