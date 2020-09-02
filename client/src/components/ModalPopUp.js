import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "./Loader";

//configure toastify
toast.configure();

const ModelPopUp = () => {
  const [modal, setModal] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleToggle = () => setModal(!modal);

  const onClickPostButton = () => {
    setLoading(true);
    const data = {
      origin,
      destination,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(process.env.REACT_APP_PROXY + "api/trips", data, {
        headers: headers,
      })
      .then((res) => {
        setLoading(false);
        setData(res.data);
        // Show Modal with response data
        setModal(!modal);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const onClickGETMessage = () => {
    setLoading(true);

    // Make a GET request
    axios({
      method: "get",
      url: process.env.REACT_APP_PROXY + "api",
    })
      .then((response) => {
        setLoading(false);

        setData(response.data);
        // Show Modal with response data
        setModal(!modal);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const onClickGETListOfPeople = () => {
    setLoading(true);
    // Make a GET request
    axios({
      method: "get",
      url: process.env.REACT_APP_PROXY + "api/trips/getListOfPeople",
    })
      .then((response) => {
        setLoading(false);
        setData(response.data);
        // Show Modal with response data
        setModal(!modal);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const onClickGetListOfTripDistances = () => {
    setLoading(true);
    // Make a GET request
    axios({
      method: "get",

      url: process.env.REACT_APP_PROXY + "api/trips/getTripDistances",
    })
      .then((response) => {
        setLoading(false);
        setData(response.data);
        // Show Modal with response data
        setModal(!modal);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  if (loading) return <Loader />;

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col mb-4 mt-5">
          <div className="card" style={{ width: "26rem" }}>
            <div className="card-body">
              <h5 className="card-title mb-3">GET a 'Hello World' message</h5>
              <h6 className="card-subtitle mb-3 text-muted">url: /api </h6>
              <p className="card-text">
                GET request that responds with a 'Hello World' message
              </p>

              <Button color="secondary" onClick={(_) => onClickGETMessage()}>
                Get a message
              </Button>
            </div>
          </div>
        </div>

        <div className="col mt-5">
          <div className="card mb-4" style={{ width: "26rem" }}>
            <div className="card-body">
              <h5 className="card-title mb-3">
                POST request to get distance between two locations using Google
                Map API
              </h5>
              <h6 className="card-subtitle mb-3 text-muted">
                url: /api/trips{" "}
              </h6>

              <p className="card-text">
                POST request that takes in a trip coordinates and responds with
                the number of miles between the 2 locations.
              </p>

              <form>
                <label>
                  Origin coordinates:
                  <input
                    type="text"
                    className="ml-3"
                    placeholder="51.546187, -0.104757"
                    value={origin}
                    onChange={(event) => setOrigin(event.target.value)}
                  />
                </label>

                <label>
                  Destination coordinates:
                  <input
                    type="text"
                    className="ml-3"
                    placeholder="51.517498, -0.153860"
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                  />
                </label>
                <br />
                <Button
                  color="secondary"
                  disabled={!origin || !destination}
                  onClick={(_) => onClickPostButton()}
                >
                  Get distance
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="w-100"></div>

        <div className="col mb-4">
          <div className="card" style={{ width: "26rem" }}>
            <div className="card-body">
              <h5 className="card-title mb-3">
                GET request to return a list of people on a trip with more than
                $25,000 expense
              </h5>
              <h6 className="card-subtitle mb-3 text-muted">
                url: /api/trips/getListOfPeople{" "}
              </h6>

              <p className="card-text">
                A GET request to return a list of people with the first name,
                last name, and email address of those contacts that have been on
                a trip with more than $25,000 expense amount. <br />
                *Using in-memory data
              </p>
              <Button
                color="secondary"
                onClick={(_) => onClickGETListOfPeople()}
              >
                Get list of people
              </Button>
            </div>
          </div>
        </div>

        <div className="col mb-4">
          <div className="card" style={{ width: "26rem" }}>
            <div className="card-body">
              <h5 className="card-title mb-3">
                GET request to return a list of trip distances using Google Map
                API
              </h5>
              <h6 className="card-subtitle mb-3 text-muted">
                url: /api/trips/getTripDistances{" "}
              </h6>

              <p className="card-text">
                A GET request to return a list of distances between the origin
                and destinations within the trip_data using the API developed
                earlier.
              </p>
              <Button
                color="secondary"
                onClick={(_) => onClickGetListOfTripDistances()}
              >
                Get trip distances
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Response</ModalHeader>
        <ModalBody>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ModelPopUp;
