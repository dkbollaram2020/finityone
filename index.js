const express = require("express");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// @route    GET /
// @desc     Get a messsage
// @access   Public
app.get("/", (req, res) => res.json({ message: "Hello World" }));

// Trips api Routes
app.use("/api/trips", require("./routes/api/trip_distance"));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
