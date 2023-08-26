/*************************************************************************
 * Express Server
 ************************************************************************/
import express         from 'express';
import cors            from 'cors';
import { create, all } from '../dal.js';

const app = express();

// serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// quickly test the API
app.get('/api', function (req, res) {
  res.send("Hello!! :)");
});

// create user account
app.get('/api/account/create/:firstname/:lastname/:email/:password', function (req, res) {
  res.send(
    {
      "testing": "yep!"
    }
  );
  /*create(req.params.name,req.params.email,req.params.password)
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((err) => {
      console.error(err);
    })*/
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

const port = 3001;
app.listen(port);
console.log('Running on port: ' + port);