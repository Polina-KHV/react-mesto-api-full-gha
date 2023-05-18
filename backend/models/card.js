const mongoose = require('mongoose');
const { regex } = require('../config/config');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Fill Card Name Field'],
    minlength: [2, 'Card Name Length Must Be More Then 1'],
    maxlength: [30, 'Card Name Length Must Not Be More Then 30'],
  },
  link: {
    type: String,
    required: [true, 'Please Fill Card Link Field'],
    validate: {
      validator(url) {
        const reg = regex.url;
        return reg.test(url);
      },
      message: 'Please Enter A Valid Link',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
