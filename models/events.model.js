const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
  eventName: String,
  date: String,
  location: String,
  description: String,
  volunteerRole: String,
  requirement: Number,
});

const Events = mongoose.model("Events", eventsSchema);

module.exports = Events;
