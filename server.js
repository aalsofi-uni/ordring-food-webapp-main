


const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");

const app = express();
app.use(bodyParser.json());

// Firebase setup
const serviceAccount = require("path/to/serviceAccountKey.json"); // download from Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://foodi-uni-default-rtdb.firebaseio.com"
});
const db = admin.database();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "acovuni@gmail.com",
    pass: "lbqwasthztcuipwf" // remove spaces!
  }
});

// POST route for password reset
app.post("/request-reset", async (req, res) => {
  const { email } = req.body;

  try {
    const snapshot = await db.ref("users").orderByChild("email").equalTo(email).once("value");

    if (!snapshot.exists()) {
      return res.json({ message: "Email not found in our database." });
    }

    // Generate a reset token
    const resetToken = Math.random().toString(36).substr(2, 8);

    // Save token in Firebase
    snapshot.forEach(childSnap => {
      childSnap.ref.update({
        resetToken: resetToken,
        tokenCreatedAt: Date.now()
      });
    });

    // Send email with token
    const mailOptions = {
      from: "acovuni@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Your password reset token is: ${resetToken}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.json({ message: "Error sending reset email." });
      }
      res.json({ message: "Reset email sent successfully!" });
    });

  } catch (err) {
    console.log(err);
    res.json({ message: "Server error" });
  }
});

app.listen(5502, () => console.log("Server running on port 5502"));


const nodemailer = require("nodemailer");

async function sendEmail() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "acovuni@gmail.com",
      pass: "lbqwasthztcuipwf"  // Use App Password, not real password
    }
  });

  let info = await transporter.sendMail({
    from: '"Your Name" <your_email@gmail.com>',
    to: "recipient@example.com",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>"
  });

  console.log("Message sent: %s", info.messageId);
}

sendEmail();
