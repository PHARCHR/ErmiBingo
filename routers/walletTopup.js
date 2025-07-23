const express = require("express");
const router = express.Router();
const walletTopupController = require("../controllers/walletTopupController");

router.post("/topup", walletTopupController.topupWallet);
