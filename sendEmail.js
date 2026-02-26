


const nodemailer = require("nodemailer");

// 1️⃣ Create transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,          // SSL port
  secure: true,       // use SSL
  auth: {
    user: "aconuni@gmail.com",          // your Gmail address
    pass: "lvwdojqiicntayya" // 16-character App Password, remove spaces
  },
  logger: true,      // optional: logs SMTP activity
  debug: true        // optional: prints debug info
});

// 2️⃣ Define email options
const mailOptions = {
    from: "aconuni@gmail.com",
  to: "aalsofi@hotmail.com",        // replace with the email you want to send to
  subject: "Test Email from Node.js",
  text: "Hello! This is a test email sent using Nodemailer and Node.js."
};

// 3️⃣ Send the email
transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Email sent successfully!");
    console.log(info.response);
  }
});
