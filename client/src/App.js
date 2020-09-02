import React from "react";
import AppNavbar from "./components/AppNavbar";
import ModalPopUp from "./components/ModalPopUp";
import LoginHooks from "./components/Login";
import LogoutHooks from "./components/Logout";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppNavbar>
        <LoginHooks />
        <LogoutHooks />
      </AppNavbar>

      <Container>
        <ModalPopUp />
      </Container>
    </div>
  );
}

export default App;
