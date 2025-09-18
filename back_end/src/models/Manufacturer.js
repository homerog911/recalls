const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categories',
    required: true
  },
   manufacturer: {
    type: String,
    required: true,
    maxlength: 500
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Manufacturers', manufacturerSchema);