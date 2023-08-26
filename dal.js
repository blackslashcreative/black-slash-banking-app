/*************************************************************************
 * Data Extraction Layer
 ************************************************************************/
// Mongo db setup
import { MongoClient } from 'mongodb';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Set the database Name
const dbName = 'badbank';

let db;
async function connect() {
  // Use connect method to connect to the server
  try {
    await client.connect();
    console.log('Connected successfully to database!');
    db = client.db(dbName);
    // console.log(db);
  } catch (error) {
    console.log('Failed to connect');
    throw error;
  }
}
connect();

// Create user account
async function create(name, email, password) {
  try {
    const collection = db.collection("users");
    // create a document to insert
    const doc = {
      name, 
      email, 
      password, 
      balance: 0
    };
    const result = await collection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return result;
  } 
  catch (error) {
    throw error;
  }
};

// All users
async function all() {
  try {
    const users = db.collection("users");
    const query = {};
    const options = {};
    const cursor = users.find(query, options);
    let result = [];
    // print a message if no documents were found
    if ((await users.countDocuments(query)) === 0) {
      console.log("No users found!");
    }
    for await (const doc of cursor) {
      // console.dir(doc);
      result.push(doc);
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export { create, all };