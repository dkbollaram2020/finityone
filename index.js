const express = require("express");
const path = require("path");

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// @route    GET /
// @desc     Get a messsage
// @access   Public
app.get("/", (req, res) => res.json({ message: "Hello World" }));

// Trips api Routes
app.use("/api/trips", require("./routes/api/trip_distance"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
