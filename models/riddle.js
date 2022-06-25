const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const riddleSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  userAnswer: {
    type: String,
    required: false
  },
  reward: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
},{ timestamps: true });

module.exports = mongoose.model('Riddle', riddleSchema);
