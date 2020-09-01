import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import axios from "axios";

import Loader from "./Loader";

const ModelPopUp = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleToggle = () => setModal(!modal);

  if (loading) return <Loader />;

  return (
    <Container>
      <Row>
        <Col xs="6">
          <Card>
            <CardBody>
              <CardTitle>
                <strong>GET a 'Hello World' message</strong>
              </CardTitle>
              <CardSubtitle>url: /</CardSubtitle>
              <CardText>
                GET request that responds with a 'Hello World' message
              </CardText>
              {/* GET / */}
              <Button
                color="secondary"
                onClick={() => {
                  setLoading(true);

                  // Make a GET request
                  axios({
                    method: "get",
                    url: process.env.REACT_APP_PROXY + "api",
                  }).then((response) => {
                    setLoading(false);

                    setData(response.data);
                    // Show Modal with response data
                    setModal(!modal);
                  });
                }}
              >
                Get a message
              </Button>
            </CardBody>
          </Card>{" "}
        </Col>
        <Col xs="6">
          <Card>
            <CardBody>
              <CardTitle>
                <strong>
                  POST request to get distance between two locations using
                  Google Map API
                </strong>
              </CardTitle>
              <CardSubtitle>url: /api/trips </CardSubtitle>
              <CardText>
                POST request that takes in a trip coordinates and responds with
                the number of miles between the 2 locations.
              </CardText>
              {/* POST /api/trips*/}
              <Button
                color="secondary"
                onClick={() => {
                  // Make a POST request
                  const data = {
                    origin: "51.532428, -0.641104",
                    destination: "51.555817, -0.146970",
                  };
                  const headers = {
                    "Content-Type": "application/json",
                  };

                  axios
                    .post(process.env.REACT_APP_PROXY + "api/trips", data, {
                      headers: headers,
                    })
                    .then((res) => {
                      setData(res.data);
                      // Show Modal with response data
                      setModal(!modal);
                    });
                }}
              >
                Get distance
              </Button>
            </CardBody>
          </Card>{" "}
        </Col>
      </Row>

      <Row>
        <Col xs="6">
          <Card>
            <CardBody>
              <CardTitle>
                <strong>
                  GET request to return a list of people on a trip with more
                  than $25,000 expense
                </strong>
              </CardTitle>
              <CardSubtitle>url: /api/trips/getListOfPeople </CardSubtitle>
              <CardText>
                A GET request to return a list of people with the first name,
                last name, and email address of those contacts that have been on
                a trip with more than $25,000 expense amount. <br />
                *Using in-memory data
              </CardText>
              {/* GET /api/trips/getListOfPeople */}
              <Button
                color="secondary"
                onClick={() => {
                  // Make a GET request
                  axios({
                    method: "get",
                    url: process.env.REACT_APP_PROXY + "api/trips/getListOfPeople",
                  }).then((response) => {
                    setData(response.data);
                    // Show Modal with response data
                    setModal(!modal);
                  });
                }}
              >
                Get list of people
              </Button>
            </CardBody>
          </Card>{" "}
        </Col>
        <Col xs="6">
          <Card>
            <CardBody>
              <CardTitle>
                <strong>
                  GET request to return a list of trip distances using Google
                  Map API
                </strong>
              </CardTitle>
              <CardSubtitle>url: /api/trips/getTripDistances </CardSubtitle>
              <CardText>
                A GET request to return a list of distances between the origin
                and destinations within the trip_data using the API developed
                earlier.
              </CardText>{" "}
              {/* GET /api/trips/getTripDistances */}
              {/* <Spinner type="grow" color="dark" /> */}
              <Button
                color="secondary"
                onClick={() => {
                  setLoading(true);
                  // Make a GET request
                  axios({
                    method: "get",
                    url: process.env.REACT_APP_PROXY + "api/trips/getTripDistances",
                  }).then((response) => {
                    setLoading(false);
                    setData(response.data);
                    // Show Modal with response data
                    setModal(!modal);
                  });
                }}
              >
                Get trip distances
              </Button>
            </CardBody>
          </Card>{" "}
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Response</ModalHeader>
        <ModalBody>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default ModelPopUp;
