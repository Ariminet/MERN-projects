const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const riddleSchema = new Schema(
  {
    riddle: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Riddle = mongoose.model('Riddle', riddleSchema);

module.exports = Riddle;
