const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the Tracker collection
const trackerSchema = new Schema({
  photo: String,            // Base64-encoded photo string
  location: String,         // Current location
  date: String,             // Date of attendance
  time: String              // Time of attendance
}, { collection: 'tracker' });

// Export the model
module.exports = mongoose.model('Tracker', trackerSchema);
