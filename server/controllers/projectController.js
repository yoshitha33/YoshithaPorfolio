const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

const getProjects = async (req, res, next) => {
  try {
    const db = getDB();
    const projects = await db.collection('projects').find({}).sort({ order: 1 }).toArray();
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

const addProject = async (req, res, next) => {
  try {
    const db = getDB();
    const result = await db.collection('projects').insertOne(req.body);
    const newProject = await db.collection('projects').findOne({ _id: result.insertedId });
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const db = getDB();
    
    // Do not update the _id field
    const updateData = { ...req.body };
    delete updateData._id;

    await db.collection('projects').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    const updatedProject = await db.collection('projects').findOne({ _id: new ObjectId(id) });
    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const db = getDB();
    await db.collection('projects').deleteOne({ _id: new ObjectId(id) });
    res.json({ message: 'Project removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProjects, addProject, updateProject, deleteProject };
