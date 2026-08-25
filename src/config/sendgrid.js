import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendContactEmail({
  fullName,
  email,
  phone,
  subject,
  message,
}) {
  const emailData = {
    to: process.env.CONTACT_EMAIL,

    from: {
      email: process.env.SENDGRID_FROM_EMAIL,
      name: "Samfos Engineering",
    },

    replyTo: {
      email,
      name: fullName,
    },

    subject: `New Contact Message: ${subject}`,

    text: `
New contact message from the Samfos Engineering website.

Name: ${fullName}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}
    `,

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; color: #333;">
        
        <div style="background: #082B78; padding: 24px;">
          <h2 style="color: white; margin: 0;">
            New Contact Message
          </h2>
        </div>

        <div style="padding: 24px; border: 1px solid #eee;">
          
          <p>
            A new message has been submitted through the
            <strong>Samfos Engineering</strong> website.
          </p>

          <hr />

          <p>
            <strong>Name:</strong><br />
            ${fullName}
          </p>

          <p>
            <strong>Email:</strong><br />
            ${email}
          </p>

          <p>
            <strong>Phone:</strong><br />
            ${phone}
          </p>

          <p>
            <strong>Subject:</strong><br />
            ${subject}
          </p>

          <div style="margin-top: 24px;">
            <strong>Message:</strong>

            <div style="
              margin-top: 10px;
              padding: 16px;
              background: #f5f7fa;
              border-left: 4px solid #00A9E0;
            ">
              ${message}
            </div>
          </div>

        </div>

        <p style="font-size: 12px; color: #777; margin-top: 20px;">
          This email was automatically generated from the Samfos Engineering
          contact form.
        </p>

      </div>
    `,
  };

  return sgMail.send(emailData);
}
