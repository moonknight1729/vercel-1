const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dbPath = path.join(__dirname, "../data/db.json");

// Helper to read/write JSON
const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf8"));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// GET all slots
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.slots);
});

// PUT update a slot's status
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const db = readDB();
  const slotIndex = db.slots.findIndex((slot) => slot.id === id);

  if (slotIndex === -1) {
    return res.status(404).json({ error: "Slot not found" });
  }

  db.slots[slotIndex].status = status;
  writeDB(db);

  res.json({ message: "Slot updated successfully", slot: db.slots[slotIndex] });
});

// POST create a new booking
router.post("/bookings", (req, res) => {
  const db = readDB();
  const booking = { id: Date.now().toString(), ...req.body };

  db.bookings.push(booking);
  writeDB(db);

  res.status(201).json({ message: "Booking created successfully", booking });
});

// GET all bookings
router.get("/bookings", (req, res) => {
  const db = readDB();
  res.json(db.bookings);
});

module.exports = router;
