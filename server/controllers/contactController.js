const { getDB } = require('../config/db');
const nodemailer = require('nodemailer');

const submitContactMsg = async (req, res, next) => {
  try {
    const db = getDB();
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      res.status(400);
      throw new Error('Please include name, email and message');
    }

    const newMessage = {
      name,
      email,
      message,
      createdAt: new Date()
    };

    const result = await db.collection('messages').insertOne(newMessage);

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'yoshithanunna77@gmail.com',
      subject: `New Portfolio Message from ${name}`,
      text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to yoshithanunna33@gmail.com');
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // We still want to return 201 because the message was saved in DB
    }

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const db = getDB();
    const messages = await db.collection('messages').find({}).sort({ createdAt: -1 }).toArray();
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

module.exports = { submitContactMsg, getMessages };
