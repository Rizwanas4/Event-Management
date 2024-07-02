// backend/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rizwana.s2022cse@sece.in',
    pass: 'Sathik#0_4' // or use an app-specific password
  }
});

const sendMail = (to, subject, text, callback) => {
  const mailOptions = {
    from: 'rizwana.s2022cse@sece.ac.in',
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return callback(error, null);
    }
    return callback(null, info);
  });
};

module.exports = sendMail;
