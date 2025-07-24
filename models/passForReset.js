const mongoose = require("mongoose");

const ResetSchema = new mongoose.Schema(
  {
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reset", logsSchema);
