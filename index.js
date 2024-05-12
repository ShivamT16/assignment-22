const express = require("express");
const cors = require("cors");
const app = express();

require("./db.connection");
const Events = require("./models/events.model");
const Volunteer = require("./models/volunteer.model");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "Hello! Welcome to the backend code of Volunteer Management Application.",
  );
});

app.post("/volunteers", async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    await newVolunteer.save();
    res.status(201).json(newVolunteer);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

app.get("/volunteers", async (req, res) => {
  try {
    const allVolunteers = await Volunteer.find();
    if (allVolunteers) {
      res.status(200).json(allVolunteers);
    } else {
      res.status(500).json("Volunteers not found");
    }
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

app.post("/volunteers/:id", async (req, res) => {
  try {
    const updatedData = await Volunteer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (updatedData) {
      res.status(200).json(updatedData);
    } else {
      res.staus(500).json("Volunteer not found");
    }
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

app.delete("/volunteers/:id", async (req, res) => {
  try {
    const deletedData = await Volunteer.findByIdAndDelete(req.params.id);
    if (deletedData) {
      res.status(200).json(deletedData);
    } else {
      res.status(500).json("Volunteer not find");
    }
  } catch (error) {
    res.staus(500).json({ Error: error });
  }
});

app.post("/events", async (req, res) => {
  try {
    const newEvent = new Events(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

app.get("/events", async (req, res) => {
  try {
    const getEvents = await Events.find();
    if (getEvents) {
      res.status(200).json(getEvents);
    } else {
      res.status(500).json("Events not found");
    }
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

app.post("/events/:id", async (req, res) => {
  try {
    const updatedData = await Events.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (updatedData) {
      res.status(200).json(updatedData);
    } else res.staus(500).json("Event not found");
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

app.delete("/events/:id", async (req, res) => {
  try {
    const deletedData = await Events.findByIdAndDelete(req.params.id);
    if (deletedData) {
      res.status(200).json(deletedData);
    } else {
      res.status(500).json("Event not found");
    }
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
