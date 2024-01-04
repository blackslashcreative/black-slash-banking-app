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
  role: {
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
      role: "customer",
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



// Function: Get user data -- all bank data
async function getBankData() {
  try {
    const users = await User.find({});
    return users;
  } 
  catch (error) {
    throw error;
  }
};

// Function: Make a deposit
async function depositMoney(balance, amount, uid) {
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

// Function: Make a withdraw
async function withdrawMoney(balance, amount,uid) {
  try {
    //const user = await User.findById(uid);
    //return user;
    let newBalance = Number(balance) - Number(amount);
    let newUser = User.findByIdAndUpdate( uid, { balance: newBalance } );
    return newUser;
  } 
  catch (error) {
    throw error;
  }
};
async function deleteUser(uid) {
  try {
    const deletedUser = await User.findByIdAndDelete(uid);
    return deletedUser;
  } catch (error) {
    throw error;
  }
}


export { create, getUser, depositMoney, withdrawMoney, getBankData,deleteUser };