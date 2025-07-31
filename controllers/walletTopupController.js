const nodemailer = require("nodemailer");
const Pass = require("../models/pass"); // Assuming you have a Pass model for user data
const walletTopup = async (req, res) => {
  const { amount, email } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Valid amount is required" });
  }
  try {
    const User = await Pass.findOne({email});
    sendEmail=User.sendEmail
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error while finding user" });
  }

  try {
    const topupTime = new Date().toLocaleString("am-ET", {
      timeZone: "Africa/Addis_Ababa",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fargeta92@gmail.com",
        pass: "qlegxtfztjstnvls", // Note: Use env var in production
      },
    });

    const mailOptions = {
      from: "fargeta92@gmail.com",
      to: sendEmail, // Assuming user has a sendEmail field for notification
      subject: "Wallet Top-Up Notification",
      text: `A wallet has been topped up:\n\nAmount: ${amount} ETB\nTime: ${topupTime}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Failed to send email:", error);
      } else {
        console.log("✅ Email sent:", info.response);
      }
    });

    return res.status(200).json({
      message: "Top-up processed and notification sent",
    });
  } catch (err) {
    console.error("Top-up error:", err);
    return res.status(500).json({ message: "Server error during top-up" });
  }
};
module.exports = walletTopup;
