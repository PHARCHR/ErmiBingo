const mongoose = require("mongoose");
const passSchema = new mongoose.Schema({
  password: String,
  email: String,
  sendEmail:String,
  sendEmail2: String,
});
module.exports = mongoose.model("Pass", passSchema);
