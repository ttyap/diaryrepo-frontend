import React from "react";
import axios from "axios";
import qs from "qs";
import * as Icon from "react-bootstrap-icons";

import {Button, Form, Card, Container} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emaill: "",
      username: "",
      password: "",
      formErr: "",
    };
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleFormSubmission(e) {
    e.preventDefault();

    axios
      .post(
        `http://localhost:5000/api/v1/user/register`,
        qs.stringify({
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
        })
      )
      .then((response) => {
        if (!response.data.success) {
          this.setState({
            formErr: "Error occurred in form, please check values",
          });
          return;
        }
        this.props.history.push("/");
      })

      .catch((err) => {
        this.setState({
          formErr: "Error in form, please check values",
        });
      });
  }

  render() {
    return (
      <div className="Register  ">
        <Container>
          <Card
            style={{
              marginTop: "20px",
              width: "430px",
              height: "100%",
              opacity: "95%",
              padding: "50px",
            }}
          >
            <Card.Header style={{fontWeight: "bolder", fontSize: "x-large"}}>
              Welcome to diaryRepo <Icon.Journal></Icon.Journal>
            </Card.Header>
            <Card.Title style={{marginTop: "10px"}}>Register</Card.Title>
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  this.handleFormSubmission(e);
                }}
              >
                <Form.Group size="lg" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    autoFocus
                    type="username"
                    name="username"
                    onChange={(e) => {
                      this.handleInputChange(e);
                    }}
                  />
                  <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      autoFocus
                      type="email"
                      name="email"
                      onChange={(e) => {
                        this.handleInputChange(e);
                      }}
                    />
                  </Form.Group>
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    autoFocus
                    type="password"
                    name="password"
                    onChange={(e) => {
                      this.handleInputChange(e);
                    }}
                  />
                </Form.Group>

                <Button block size="lg" type="submit">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default Register;
