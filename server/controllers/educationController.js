const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

const getEducation = async (req, res, next) => {
  try {
    const db = getDB();
    const education = await db.collection('education').find({}).sort({ order: 1 }).toArray();
    res.json(education);
  } catch (error) {
    next(error);
  }
};

const addEducation = async (req, res, next) => {
  try {
    const db = getDB();
    const result = await db.collection('education').insertOne(req.body);
    const newEdu = await db.collection('education').findOne({ _id: result.insertedId });
    res.status(201).json(newEdu);
  } catch (error) {
    next(error);
  }
};

const updateEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const db = getDB();

    const updateData = { ...req.body };
    delete updateData._id;

    await db.collection('education').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    const updatedEdu = await db.collection('education').findOne({ _id: new ObjectId(id) });
    res.json(updatedEdu);
  } catch (error) {
    next(error);
  }
};

const deleteEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const db = getDB();
    await db.collection('education').deleteOne({ _id: new ObjectId(id) });
    res.json({ message: 'Education removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getEducation, addEducation, updateEducation, deleteEducation };
