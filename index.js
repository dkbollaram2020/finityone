const express = require("express");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

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

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
