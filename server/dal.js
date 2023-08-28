/*************************************************************************
 * Data Extraction Layer
 ************************************************************************/
import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define user schema
const userSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Function: Create new user
async function create(uid, firstname, lastname, email) {
  try {
    const newUser = await User.create({
      _id: uid,
      firstname: firstname,
      lastname:  lastname,
      email:  email,
      balance: 0
    });
    return newUser;
  } 
  catch (error) {
    throw error;
  }
};

// Function: Get user data
async function getUser(uid) {
  try {
    const user = await User.findById(uid);
    return user;
  } 
  catch (error) {
    throw error;
  }
};

// Function: Make a deposit
async function depositMoney(balance, amount,uid) {
  try {
    //const user = await User.findById(uid);
    //return user;
    let newBalance = Number(balance) + Number(amount);
    let newUser = User.findByIdAndUpdate( uid, { balance: newBalance } );
    return newUser;
  } 
  catch (error) {
    throw error;
  }
};

// Function: Get all users
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

export { create, getUser, depositMoney, all };