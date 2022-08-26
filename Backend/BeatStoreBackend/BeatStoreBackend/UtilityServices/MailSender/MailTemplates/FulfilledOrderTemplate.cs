using Entities.Models;

namespace BeatStoreBackend.UtilityServices.MailSender.MailTemplates
{
    public static class FulfilledOrderTemplate
    {
        public static Message CreateFromTemplate(List<string> attachmentPaths, Order order)
        {
            return new Message(
                to: new MimeKit.MailboxAddress(order.Name,order.Email),
                subject: "Beatstore Invoice",
                content: string.Format(
                "<h1 style=\"text-align: center; \"><strong>Thank you for your order, {0}!</strong></h1>" +
                "<h3 style=\"text-align: center;\">Beats you've bought can be downloaded through the link below</h3>" +
                "<p style=\"text-align: center;\"><a href=\"{1}\">{1}</a></p>" +
                "<p style=\"text-align: center;\">Licenses TOS are provided in .pdf attachments below.</p>" +
                "<p style=\"text-align: center;\">For any inquiries, please reply to this mail.</p>",
                order.Name, "http://localhost:3000/fulfilledorder?orderid=" + order.Id
                ),
                attachmentPaths: attachmentPaths
                );
        }
    }
}
