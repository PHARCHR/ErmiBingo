const express = require('express'); // ✅ Properly import express
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const loginRouter = require('./routers/loginRouter');
const connectDB = require('./db/connection');

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Fix: express must be defined first

// Routes
app.use("/api/v1", loginRouter); // ✅ Fix: Add leading slash "/"

// Start Server
app.listen(process.env.PORT || 3000, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
