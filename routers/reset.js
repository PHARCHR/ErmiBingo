const express = require("express");
const router = express.Router();
const {
  deleteReset,
  getReset,
  createReset,
  validateResetPassword  // Add this if you're using the validation controller
} = require("../controllers/resetController");

// Proper route definitions
router.post("/create", createReset);       // Create new reset password
router.get("/get", getReset);           // Get current reset password
router.delete("/delete", deleteReset);     // Delete reset password
router.post("/validate", validateResetPassword);  // Add validation route

module.exports = router;