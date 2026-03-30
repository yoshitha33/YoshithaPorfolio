const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio";
const client = new MongoClient(uri);

let dbConnection;

const connectDB = async () => {
  try {
    await client.connect();
    // Assuming the database name is part of the URI, or you can supply it explicitly
    dbConnection = client.db();
    console.log(`MongoDB Connected: ${uri}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const getDB = () => {
    if (!dbConnection) throw new Error("Database not connected!");
    return dbConnection;
};

module.exports = { connectDB, getDB, client };
