const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  volunteerName: { type: String, required: true },
  contactNumber: Number,
  skills: String,
  availability: Boolean,
  areaOfInterest: String,
  eventAssigned: [String],
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports = Volunteer;
