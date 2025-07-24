const Reset = require("../models/passForReset");

const validateResetPassword = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ 
      isValid: false,
      message: "Password is required" 
    });
  }

  try {
    // Get the stored password (assuming only one exists)
    const reset = await Reset.findOne({});
    
    if (!reset) {
      return res.status(404).json({ 
        isValid: false,
        message: "No admin password set" 
      });
    }

    // Compare plaintext passwords (⚠️ Not secure for production!)
    if (password === reset.password) {
      return res.status(200).json({ 
        isValid: true,
        message: "Password is valid" 
      });
    } else {
      return res.status(401).json({ 
        isValid: false,
        message: "Incorrect password" 
      });
    }

  } catch (error) {
    return res.status(500).json({ 
      isValid: false,
      message: "Error validating password",
      error: error.message 
    });
  }
};

module.exports = validateResetPassword;