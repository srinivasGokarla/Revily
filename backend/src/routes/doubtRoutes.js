
const express = require("express");
const router = express.Router();
const doubtController = require("../controllers/doubt.controller");
const { verifyToken } = require('../Middleware/authentication');

router.post("/create-doubt/:studentId",  doubtController.createDoubt );
router.get("/doubt-history", doubtController.doubtHistory);


module.exports = router;
