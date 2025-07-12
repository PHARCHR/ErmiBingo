const express = require("express");
const router = express.Router();
const {
  login,
  setPass,
  deletePass,
} = require("../controllers/loginControllers");


router.post("/login", login); 
router.post("/setPass", setPass); 
router.delete("/deletePass", deletePass); 

module.exports = router;
