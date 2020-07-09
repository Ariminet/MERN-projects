// REQ FOR THE SERVER --------------------------------------
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT || 5024;
const app = express();

app.use(cors());
app.use(express.json());
// --------------------------------------------------------

// CONNECTING TO MONGODB ----------------------------
const uri = process.env.DB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// --------------------------------------------------

// ROUTES ------------------------------------------------
app.get('/', async (req, res) => {
  console.log('Hello and welcome');
});

// -------------------------------------------------------

// ROUTES ------------------------------------------------
const riddleRouter = require('./routes/riddles');
app.use('/riddles', riddleRouter);

const userRouter = require('./routes/users');
app.use('/users', userRouter);

// -------------------------------------------------------

// STATIC FOLDER -----------------------------------------
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// -------------------------------------------------------

// STARTING SERVER --------------------------------------------------------
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

// ------------------------------------------------------------------------
