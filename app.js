const express = require("express"); // ✅ Properly import express
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const loginRouter = require("./routers/loginRouter");
const connectDB = require("./db/connection");
const walletRouter = require("./routers/walletTopup"); // ✅ Properly import walletTopup router
const resetRouter = require("./routers/reset"); // ✅ Properly import reset router
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Fix: express must be defined first

// Routes
app.use("/api/v1", loginRouter);
app.use("/api/v1", walletRouter); 
app.use("/api/v1",resetRouter)// ✅ Fix: Add leading slash "/"
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
}); // ✅ Fix: Add leading slash "/"

// Start Server
app.listen(process.env.PORT || 8000, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
