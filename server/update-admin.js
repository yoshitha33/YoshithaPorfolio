const dotenv = require('dotenv');
dotenv.config();

const { connectDB, getDB, client } = require('./config/db');
const bcrypt = require('bcryptjs');

const updateAdmin = async () => {
  await connectDB();
  const db = getDB();
  const usersCollection = db.collection('users');

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('63049@Yoshi', salt);

  const result = await usersCollection.updateOne(
    { username: 'admin' },
    { $set: { username: 'yoshitha33', passwordHash } }
  );

  if (result.matchedCount === 0) {
    console.log('No admin user found! Run npm run setup first.');
  } else {
    console.log('Admin updated! New username: yoshitha33, new password: 63049@Yoshi');
  }

  await client.close();
  process.exit();
};

updateAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
