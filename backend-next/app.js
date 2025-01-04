const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const slotRoutes = require("./routes/slots");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/slots", slotRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
