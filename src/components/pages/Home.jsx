import React from "react";
import {Container} from "react-bootstrap";
import Login from "./Login";

class Home extends React.Component {
  render() {
    return (
      <div className="page-home">
        <Container>
          <Login />
        </Container>
      </div>
    );
  }
}

export default Home;
