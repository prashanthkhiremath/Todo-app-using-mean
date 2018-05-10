const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todos')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(() => console.log('Could not connect to MongoDB...'));

module.exports = {mongoose};

