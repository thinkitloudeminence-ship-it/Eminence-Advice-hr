const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    
    const mailOptions = {
      from: 'Eminance Advice <noreply@eminanceadvice.com>',
      to: options.email,
      subject: options.subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff6b35;">Eminance Advice</h2>
          <p>Dear ${options.name || 'Applicant'},</p>
          <p>${options.message || 'Thank you for connecting with us.'}</p>
          <p>Best regards,<br>Eminance Advice Team</p>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
  } catch (error) {
    // ✅ Email fail hone pe application submit block nahi hogi
    console.warn('Email send failed (non-critical):', error.message);
  }
};

module.exports = sendEmail;