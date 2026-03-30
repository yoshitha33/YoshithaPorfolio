const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

const getExperience = async (req, res, next) => {
  try {
    const db = getDB();
    const experience = await db.collection('experience').find({}).sort({ order: 1 }).toArray();
    res.json(experience);
  } catch (error) {
    next(error);
  }
};

const addExperience = async (req, res, next) => {
  try {
    const db = getDB();
    const result = await db.collection('experience').insertOne(req.body);
    const newExp = await db.collection('experience').findOne({ _id: result.insertedId });
    res.status(201).json(newExp);
  } catch (error) {
    next(error);
  }
};

const updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const db = getDB();
    
    const updateData = { ...req.body };
    delete updateData._id;

    await db.collection('experience').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    const updatedExp = await db.collection('experience').findOne({ _id: new ObjectId(id) });
    res.json(updatedExp);
  } catch (error) {
    next(error);
  }
};

const deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const db = getDB();
    await db.collection('experience').deleteOne({ _id: new ObjectId(id) });
    res.json({ message: 'Experience removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getExperience, addExperience, updateExperience, deleteExperience };
