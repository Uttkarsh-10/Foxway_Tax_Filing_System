const express = require("express");
const cors = require("cors");

const individualRoutes = require("./routes/individualRoutes");
const corporateRoutes = require("./routes/corporateRoutes");

require("./config/db"); // connect DB

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/individual", individualRoutes);
app.use("/api/corporate", corporateRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Foxway Tax Filing Server Running ✅");
});

app.listen(3000, () => {
    console.log("Server running on port 3000 🚀");
});