const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

const getCertificates = async (req, res, next) => {
  try {
    const db = getDB();
    const certificates = await db.collection('certificates').find({}).sort({ order: 1 }).toArray();
    res.json(certificates);
  } catch (error) {
    next(error);
  }
};

const createCertificate = async (req, res, next) => {
  try {
    const db = getDB();
    const { title, issuer, image, issueDate, credentialUrl, order } = req.body;
    
    if (!title || !image) {
      res.status(400);
      throw new Error('Please include title and image');
    }

    const newCertificate = {
      title,
      issuer,
      image,
      issueDate,
      credentialUrl,
      order: order || 1,
      createdAt: new Date()
    };

    const result = await db.collection('certificates').insertOne(newCertificate);
    const createdCertificate = await db.collection('certificates').findOne({ _id: result.insertedId });
    res.status(201).json(createdCertificate);
  } catch (error) {
    next(error);
  }
};

const updateCertificate = async (req, res, next) => {
  try {
    const db = getDB();
    const { title, issuer, image, issueDate, credentialUrl, order } = req.body;
    
    // Build update object
    const updateData = {
      ...(title && { title }),
      ...(issuer && { issuer }),
      ...(image && { image }),
      ...(issueDate && { issueDate }),
      ...(credentialUrl && { credentialUrl }),
      ...(order && { order }),
      updatedAt: new Date()
    };

    const result = await db.collection('certificates').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      res.status(404);
      throw new Error('Certificate not found');
    }

    const updatedCertificate = await db.collection('certificates').findOne({ _id: new ObjectId(req.params.id) });
    res.json(updatedCertificate);
  } catch (error) {
    next(error);
  }
};

const deleteCertificate = async (req, res, next) => {
  try {
    const db = getDB();
    const result = await db.collection('certificates').deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      res.status(404);
      throw new Error('Certificate not found');
    }
    
    res.json({ message: 'Certificate removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCertificates, createCertificate, updateCertificate, deleteCertificate };
