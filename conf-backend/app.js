const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const session = require('express-session')
const logger = require('morgan');
const apiRouter = require('./routes/ApiRoutes');

require('dotenv').config()
// console.log(process.env)

const mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
)
mongoose.set('strictQuery', true);

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({secret: process.env.SESSION_SECRET}))

app.get('/', (req, res, next) => {
    res.status(200).send('This is just an API, please use the /api route');
})
app.use('/api', apiRouter);

module.exports = app;