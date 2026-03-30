const dotenv = require('dotenv');
dotenv.config(); // Must be first!

const { connectDB, getDB, client } = require('./config/db');
const bcrypt = require('bcryptjs');

const setupAdmin = async () => {
  await connectDB();
  const db = getDB();
  const usersCollection = db.collection('users');

  const adminExists = await usersCollection.findOne({ username: 'yoshitha33' });

  if (adminExists) {
    console.log('Admin already exists!');
    await client.close();
    process.exit();
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('63049@Yoshi', salt);

  await usersCollection.insertOne({
    username: 'yoshitha33',
    passwordHash,
    bio: "Full Stack Developer shaping the web.",
    heroText: "Hi, I'm Admin",
    profileImage: ""
  });

  console.log('Admin user created with username: yoshitha33 and password: 63049@Yoshi');
  await client.close();
  process.exit();
};

setupAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
