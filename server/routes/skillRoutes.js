const express = require('express');
const { getSkills, addSkill, deleteSkill } = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getSkills)
  .post(protect, addSkill);

router.route('/:id')
  .delete(protect, deleteSkill);

module.exports = router;
