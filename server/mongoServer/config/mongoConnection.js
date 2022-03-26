const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

const client = new MongoClient('mongodb+srv://rdz:mongodb@cluster0.me63p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// let db;
async function connectMongo() {
  try {
    const connection = await client.connect();
    db = connection.db("TestFans");
  } catch (error) {
    throw error;
  }
}

function getDatabase() {
  return db;
}

module.exports = { connectMongo, getDatabase };
