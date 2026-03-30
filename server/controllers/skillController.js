const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

const getSkills = async (req, res, next) => {
  try {
    const db = getDB();
    const skills = await db.collection('skills').find({}).toArray();
    res.json(skills);
  } catch (error) {
    next(error);
  }
};

const addSkill = async (req, res, next) => {
  try {
    const db = getDB();
    const result = await db.collection('skills').insertOne(req.body);
    const newSkill = await db.collection('skills').findOne({ _id: result.insertedId });
    res.status(201).json(newSkill);
  } catch (error) {
    next(error);
  }
};

const deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const db = getDB();
    await db.collection('skills').deleteOne({ _id: new ObjectId(id) });
    res.json({ message: 'Skill removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSkills, addSkill, deleteSkill };
