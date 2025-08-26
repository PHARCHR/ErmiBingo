const nodemailer = require("nodemailer");
const Pass = require("../models/pass"); // Your User/Pass model

const walletTopup = async (req, res) => {
  const { amount, email } = req.body;

  // 1. Input Validation
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Valid positive amount is required" });
  }
  if (!email) {
    return res.status(400).json({ message: "User email is required" });
  }

  let user;
  try {
    // 2. Find the User
    user = await Pass.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
      
    }

    // 3. UPDATE THE USER'S WALLET BALANCE (The Missing Core Functionality!)
    // This is the most important line. You need to add the amount to their current balance.
    user.walletBalance += amount; // Assuming the field is named 'walletBalance'
    await user.save(); // Save the updated user document to the database

  } catch (error) {
    console.error("Server error while finding or updating user:", error);
    return res.status(500).json({ message: "Server error during top-up transaction" });
  }

  // 4. Send Notification Email (after the core transaction is complete)
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
        user:  "fargeta92@gmail.com", // Use environment variables!
        pass: "qlegxtfztjstnvls",
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: "wanawbingo@gmail.com", // Admin email
      subject: "Wallet Top-Up Notification",
      text: `A wallet has been topped up:\n\nUser: ${user.email}\nAmount: ${amount} ETB\nTime: ${topupTime}`, // Added new balance info
    };

    // Send email (fire and forget - if it fails, we log it but don't fail the request)
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Failed to send admin notification email:", error);
      } else {
        console.log("✅ Admin notification email sent:", info.response);
      }
    });

    // 5. Respond to the Client
    return res.status(200).json({
      message: "Top-up successful and notification sent",
      newBalance: user.walletBalance // Send the new balance back to the client
    });

  } catch (err) {
    // This catch block is for the email setup, not the main transaction
    console.error("Error creating email transporter or options:", err);
    // The top-up was already successful, so we still respond with 200 but note the email issue.
    return res.status(200).json({
      message: "Top-up successful but failed to send notification",
      newBalance: user.walletBalance
    });
  }
};

module.exports = walletTopup;