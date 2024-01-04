const Users = require("../models/user.model");
const Doubt = require("../models/doubt.model");
const Messages = require('../models/message.model');
const Conversations = require('../models/conversation.model');



exports.dashBoard = async(req,res) => {
  try {
    const userId = req.params.userId;
    const user = await Users.findById(userId);
    res.status(200).json({ user });
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

exports.doubtHistory = async(req,res) => {
  try {
    const userId = req.params.userId;
    const conversations = await Conversations.find({ members: userId });
    res.status(200).json({ conversations });
} catch (error) {
    res.status(500).json({ error: error.message });
}
}


exports.createDoubt = async(req,res) => {
  try {
    const { studentId, doubtSubject, classGrade, language } = req.body;
    const onlineTutors = await Users.find({
        role: 'tutor',
        classGrade,
        language,
    });

    if (onlineTutors.length === 0) {
        return res.status(404).send('No online tutors available matching the criteria');
    }

    const newDoubt = new Doubt({
        studentId,
        doubtSubject,
        classGrade,
        language,
    });

    await newDoubt.save();

    onlineTutors.forEach((tutor) => {
        console.log(`Email sent to tutor ${tutor.email}: New doubt request`);
    });

    res.status(200).send('Doubt request created successfully');
} catch (error) {
    console.log(error, 'Error');
    res.status(500).send('Internal Server Error');
}
}

exports.conversations = async(req,res) => {
  try {
    const { senderId, receiverId } = req.body;
    const newCoversation = new Conversations({ members: [senderId, receiverId] });
    await newCoversation.save();
    res.status(200).send('Conversation created successfully');
} catch (error) {
    console.log(error, 'Error')
}
}

exports.allConversations = async(req,res) => {
  try {
    const userId = req.params.userId;
    const conversations = await Conversations.find({ members: { $in: [userId] } });
    const conversationUserData = Promise.all(conversations.map(async (conversation) => {
        const receiverId = conversation.members.find((member) => member !== userId);
        const user = await Users.findById(receiverId);
        return { user: { receiverId: user._id, email: user.email, fullName: user.fullName }, conversationId: conversation._id }
    }))
    res.status(200).json(await conversationUserData);
} catch (error) {
    console.log(error, 'Error')
}
}

exports.message = async(req,res) => {
  try {
    const { conversationId, senderId, message, receiverId = '' } = req.body;
    if (!senderId || !message) return res.status(400).send('Please fill all required fields')
    if (conversationId === 'new' && receiverId) {
        const newCoversation = new Conversations({ members: [senderId, receiverId] });
        await newCoversation.save();
        const newMessage = new Messages({ conversationId: newCoversation._id, senderId, message });
        await newMessage.save();
        return res.status(200).send('Message sent successfully');
    } else if (!conversationId && !receiverId) {
        return res.status(400).send('Please fill all required fields')
    }
    const newMessage = new Messages({ conversationId, senderId, message });
    await newMessage.save();
    res.status(200).send('Message sent successfully');
} catch (error) {
    console.log(error, 'Error')
}
}

exports.messageOfConversation = async(req,res) => {
  try {
    const checkMessages = async (conversationId) => {
        console.log(conversationId, 'conversationId')
        const messages = await Messages.find({ conversationId });
        const messageUserData = Promise.all(messages.map(async (message) => {
            const user = await Users.findById(message.senderId);
            return { user: { id: user._id, email: user.email, fullName: user.fullName }, message: message.message }
        }));
        res.status(200).json(await messageUserData);
    }
    const conversationId = req.params.conversationId;
    if (conversationId === 'new') {
        const checkConversation = await Conversations.find({ members: { $all: [req.query.senderId, req.query.receiverId] } });
        if (checkConversation.length > 0) {
            checkMessages(checkConversation[0]._id);
        } else {
            return res.status(200).json([])
        }
    } else {
        checkMessages(conversationId);
    }
} catch (error) {
    console.log('Error', error)
}
}
