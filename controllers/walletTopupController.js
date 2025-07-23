const nodemailer = require("nodemailer");

const walletTopup = async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Valid amount is required" });
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
      to: "ermiaswantstolearn@gmail.com",
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