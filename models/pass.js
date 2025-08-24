const mongoose = require("mongoose");
const passSchema = new mongoose.Schema({
  password: String,
  email: String,
});
module.exports = mongoose.model("Pass", passSchema);
