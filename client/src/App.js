import React from "react";
import AppNavbar from "./components/AppNavbar";
import ModalPopUp from "./components/ModalPopUp";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <ModalPopUp />
      </Container>
    </div>
  );
}

export default App;
