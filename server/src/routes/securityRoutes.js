const express = require("express");
const router = express.Router();
const csrfProtection = require("../config/csrfConfig.js");
const { generateCsrfToken } = require("../controllers/securityController.js");

router.get("/csrf-token", csrfProtection, generateCsrfToken);

module.exports = router;
