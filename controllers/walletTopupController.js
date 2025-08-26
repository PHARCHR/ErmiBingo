const nodemailer = require("nodemailer");
const Pass = require("../models/pass");

const walletTopup = async (req, res) => {
  const { amount, email } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Valid amount is required" });
  }

  let User;
  try {
    User = await Pass.findOne({ email });
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("DB error:", error);
    return res.status(500).json({ message: "Server error while finding user" });
  }

  try {
    // Example: update balance (if your schema has balance)
    // User.balance = (User.balance || 0) + amount;
    // await User.save();

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
        user: process.env.EMAIL_USER, // "fargeta92@gmail.com"
        pass: process.env.EMAIL_PASS, // use env vars
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: User.email, // send to the actual user
      subject: "Wallet Top-Up Notification",
      text: `Your wallet has been topped up:\n\nAmount: ${amount} ETB\nTime: ${topupTime}\nEmail: ${User.email}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Top-up processed and notification sent",
    });
  } catch (err) {
    console.error("Top-up error:", err);
    return res.status(500).json({ message: "Server error during top-up" });
  }
};

module.exports = walletTopup;
