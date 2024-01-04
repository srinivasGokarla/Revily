
const express = require("express");
const router = express.Router();
const doubtController = require("../controllers/doubt.controller");


router.get("/dashboard/:userId",  doubtController.dashBoard);
router.get("/doubt-history/:userId", doubtController.doubtHistory);
router.post("/doubt",  doubtController.createDoubt );
router.post("/conversation", doubtController.conversations);
router.get("/conversations/:userId", doubtController.allConversations);

router.post("/message", doubtController.message);
router.get("/message/:conversationId", doubtController.messageOfConversation);

module.exports = router;
