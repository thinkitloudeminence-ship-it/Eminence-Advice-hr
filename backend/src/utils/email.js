const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  const mailOptions = {
    from: 'Eminance Advice <noreply@eminanceadvice.com>',
    to: options.email,
    subject: options.subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Eminance Advice</h2>
        <p>Dear ${options.data.name},</p>
        <p>${options.message || 'Thank you for connecting with us.'}</p>
        <p>Best regards,<br>Eminance Advice Team</p>
      </div>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;