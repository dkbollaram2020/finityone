const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

// @route    POST /
// @desc     Return number of miles between the 2 locations
// @access   Public
router.post("/", (req, res) => {
  // get origin and destination inputs
  const inputs = {
    ...req.body,
  };

  if (!inputs.origin || !inputs.destination) {
    return res
      .status(400)
      .json({ msg: "Please include a origin and destination" });
  }

  // Invoke Google API
  axios
    .get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${inputs.origin}&destinations=${inputs.destination}&key=AIzaSyCuubw5DUs69lnUrSw1QtZJW8wgTP-RqmE`
    )
    .then((response) => {
      return res.json({
        distance: response.data.rows[0].elements[0].distance.text,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ msg: "Server error occurred" });
    });
});

// @route    GET/getListOfPeople
// @desc     Return list of people
// @access   Public
router.get("/getListOfPeople", (req, res) => {
  let listOfPeople = [];
  let contacts = [];
  let trip_data = [];

  // read the contacts from local csv files
  fs.createReadStream(path.resolve(__dirname, "assets", "contacts.csv"))
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => console.error(error))
    .on("data", (row) => contacts.push(row))
    .on("end", (rowCount) => console.log(`Parsed ${rowCount} rows`));

  // read the trip data from local csv files
  fs.createReadStream(path.resolve(__dirname, "assets", "trip_data.csv"))
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => console.error(error))
    .on("data", (row) => trip_data.push(row))
    .on("end", (rowCount) => {
      const expensive_trips = trip_data.filter(
        (trip) =>
          Number(trip.trip_expense_total.replace(/[^0-9.-]+/g, "")) > 25000
      );

      expensive_trips.forEach((trip) => {
        const temp = contacts.find((contact) => contact.id == trip.contact_id);
        listOfPeople.push({
          first_name: temp.first_name,
          last_name: temp.last_name,
          email: temp.email,
        });
      });

      return res.json({ listOfPeople: listOfPeople });
    });
});

// @route    GET/getTripDistances
// @desc     Return list of trip distances between each of the trips
// @access   Public
router.get("/getTripDistances", (req, res) => {
  let trip_distances = [];
  let trip_data = [];

  // read the contact and trip data from local csv files
  fs.createReadStream(path.resolve(__dirname, "assets", "trip_data.csv"))
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => console.error(error))
    .on("data", (row) => trip_data.push(row))
    .on("end", async (_) => {
      const loop_over_trips = async (_) => {
        for (let index = 0; index < trip_data.length; index++) {
          const trip = trip_data[index];
          try {
            const resp = await axios.get(
              `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${trip.trip_origin_latitude},${trip.trip_origin_longitude}&destinations=${trip.trip_dest_latitude},${trip.trip_dest_longitude}&key=AIzaSyCuubw5DUs69lnUrSw1QtZJW8wgTP-RqmE`
            );
            if (resp.data.rows[0].elements[0].distance) {
              trip_distances.push({
                trip_id: trip.trip_id,
                distance: resp.data.rows[0].elements[0].distance.text,
              });
            }
          } catch (err) {
            console.error(err);
            res.status(500).json({ msg: "Server error occurred" });
          }
        }
      };
      const wait_till_calc_complete = await loop_over_trips();
      return res.json({ trip_distances: trip_distances });
    });
});

module.exports = router;
