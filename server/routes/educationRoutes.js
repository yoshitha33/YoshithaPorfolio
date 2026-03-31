const express = require('express');
const router = express.Router();
const { getEducation, addEducation, updateEducation, deleteEducation } = require('../controllers/educationController');
const { protect } = require('../middleware/authMiddleware');

// Get all education entries
router.get('/', getEducation);

// Protected routes (Admin only)
router.post('/', protect, addEducation);
router.put('/:id', protect, updateEducation);
router.delete('/:id', protect, deleteEducation);

module.exports = router;
