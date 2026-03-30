const { getDB } = require('../config/db');

const getUserProfile = async (req, res, next) => {
  try {
    const db = getDB();
    const user = await db.collection('users').findOne({ username: 'yoshitha33' }, { projection: { passwordHash: 0 } });
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const db = getDB();
    
    const updateData = {
      bio: req.body.bio,
      heroText: req.body.heroText,
      profileImage: req.body.profileImage,
      resumeLink: req.body.resumeLink
    };

    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    await db.collection('users').updateOne(
      { username: 'yoshitha33' },
      { $set: updateData }
    );
    
    const updatedUser = await db.collection('users').findOne({ username: 'admin' }, { projection: { passwordHash: 0 } });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserProfile, updateUserProfile };
