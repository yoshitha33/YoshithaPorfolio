const express = require('express');
const { submitContactMsg, getMessages } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .post(submitContactMsg)
  .get(protect, getMessages);

module.exports = router;
