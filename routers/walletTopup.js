const express = require("express");
const router = express.Router();
const walletTopup = require("../controllers/walletTopupController");

router.post("/topup", walletTopup);
module.exports = router;