const express = require("express");
const router = express.Router();
const {
  logs,
  deleteLogs,
} = require("../controllers/loginControllers");
const bcrypt = require("bcrypt");

router.post("/getLogs", logs); 
router.delete("/deleteLogs", deleteLogs);

module.exports = router;
