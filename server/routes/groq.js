const express = require("express");
const router = express.Router();
const { generateContent } = require("../controllers/groqController");


router.post("/generate", generateContent);

module.exports = router;
