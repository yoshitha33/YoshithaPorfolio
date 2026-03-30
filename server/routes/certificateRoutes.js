const express = require('express');
const { getCertificates, createCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificateController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getCertificates)
  .post(protect, createCertificate);

router.route('/:id')
  .put(protect, updateCertificate)
  .delete(protect, deleteCertificate);

module.exports = router;
