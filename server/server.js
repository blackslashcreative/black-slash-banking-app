/*************************************************************************
 * Express Server
 ************************************************************************/
import 'dotenv/config';
import express         from 'express';
import cors            from 'cors';
import mongoose from 'mongoose';
import { create, all } from './dal.js';

const app = express();

// serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/api/account/create/:uid/:firstname/:lastname/:email', function (req, res) {
  create(req.params.uid,req.params.firstname,req.params.lastname,req.params.email)
    .then((newUser) => {
      console.log(`Inserted new user into the db... ${JSON.stringify(newUser)}`);
      res.send(newUser);
    })
    .catch((err) => {
      console.error(err);
    })
});

// all accounts
app.get('/api/account/all', function (req, res) {
  all()
    .then((docs) => {
      //console.log(docs);
      res.send(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});

// Connect to MongoDB Atlas
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blackslashbank.zzgl6ag.mongodb.net/bankdb?retryWrites=true&w=majority`;
mongoose.connect(uri)
  .then(() => {
    // do stuff
    console.log('Connected to Mongo DB Atlas!');
    const port = 3001;
    app.listen(port);
    console.log('Running on port: ' + port);
  })
  .catch((error) => {
    console.log(error)
  })