require("dotenv").config();

const express = require("express");
const cors = require("cors");

const individualRoutes = require("./routes/individualRoutes");
const corporateRoutes = require("./routes/corporateRoutes");

require("./config/db");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);


app.use(express.json());


app.use("/api/individual", individualRoutes);
app.use("/api/corporate", corporateRoutes);

app.get("/", (req, res) => {
  res.send("Foxway Tax Filing Server Running ✅");
});


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Dynamic PORT (required for hosting)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});