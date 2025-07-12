const mongoose = require("mongoose");

const logsSchema = new mongoose.Schema({
  logs: { type: String, required: true },
}, { timestamps: true }); 

module.exports = mongoose.model("Logs", logsSchema);
