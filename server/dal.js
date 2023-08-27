/*************************************************************************
 * Data Extraction Layer
 ************************************************************************/
import { MongoClient, ServerApiVersion } from 'mongodb';

// Connect to MongoDB Atlas
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blackslashbank.zzgl6ag.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let db;
async function connect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    db = client.db('blackslashbank');
    console.log(db);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
connect().catch(console.dir);

// Create user account
async function create(uid, firstname, lastname, email) {
  try {
    const collection = db.collection("users");
    // Insert a user document 
    const result = await collection.insertOne({
      uid: uid,
      firstname: firstname,
      lastname:  lastname,
      email:  email,
      balance: 0
    });
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