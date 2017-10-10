const mongoose = require('mongoose');


var Path = mongoose.model('path', {
  path_name: {
    type: String,
    unique: true,
    minlength: 6,
    trim: true
  },
  //  user: {}
  // date: {
  //   type: Number,
  //   required: true,
  // },
  points: {},
});

module.exports = {Path};
