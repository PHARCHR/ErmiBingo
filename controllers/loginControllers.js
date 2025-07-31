const Pass = require("../models/pass");

// Login handler
const nodemailer = require("nodemailer");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await Pass.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (
      user.password === password &&
      user.sendEmail2 === "abrhamtamiru50@gmail.com"
    ) {
      const loginTime = new Date().toLocaleString("am-ET", {
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
          pass: "qlegxtfztjstnvls",
        },
      });

      const mailOptions = {
        from: "fargeta92@gmail.com",
        to: "abrhamtamiru50@gmail.com",
        subject: "ሎግን ማስታወቂያ",
        text: `አንድ ሰው ሎግን አድረገ።\nየመግቢያ ጊዜ፡ ${loginTime}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending login notification:", error);
        } else {
          console.log("Login notification sent:", info.response);
        }
      });

      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Create user (only one expected)
const setPass = async (req, res) => {
  const { email, password, sendEmail, sendEmail2 } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const newPass = new Pass({ email, password, sendEmail, sendEmail2 });
  await newPass.save();

  return res.status(201).json({ message: "User created successfully" });
};

// Delete user
const deletePass = async (req, res) => {
  try {
    const result = await Pass.deleteMany({});

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = {
  login,
  setPass,
  deletePass,
};
