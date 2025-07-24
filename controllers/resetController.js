const Reset = require("../models/passForReset");
const getReset = async (req, res) => {
  try {
    const reset = await Reset.findOne({}); // Assuming only one reset password exists
    if (!reset) {
      return res.status(404).json({ message: "No reset password found" });
    }
    res.status(200).json(reset);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reset password", error: error.message });
  }
};

// Create new reset password
const createReset = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    // Delete any existing reset passwords first
    await Reset.deleteMany({});

    // Create new reset password (with hashing in the model)
    const newReset = await Reset.create({ password });
    res.status(201).json({
      message: "Password created successfully",
      reset: { id: newReset._id }, // Don't send back the actual password
    });
  } catch (error) {
    res.status(500).json({
      message: "Couldn't create password",
      error: error.message,
    });
  }
};

// Delete reset password
const deleteReset = async (req, res) => {
  try {
    await Reset.deleteMany({});
    res.status(200).json({ message: "Password deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting password",
      error: error.message,
    });
  }
};

const validateResetPassword = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      isValid: false,
      message: "Password is required",
    });
  }

  try {
    // Get the stored password (assuming only one exists)
    const reset = await Reset.findOne({});

    if (!reset) {
      return res.status(404).json({
        isValid: false,
        message: "No admin password set",
      });
    }

    // Compare plaintext passwords (⚠️ Not secure for production!)
    if (password === reset.password) {
      return res.status(200).json({
        isValid: true,
        message: "Password is valid",
      });
    } else {
      return res.status(401).json({
        isValid: false,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      isValid: false,
      message: "Error validating password",
      error: error.message,
    });
  }
};

module.exports = { validateResetPassword, getReset, createReset, deleteReset };
