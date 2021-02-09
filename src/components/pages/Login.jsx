import React from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import qs from "qs";
import moment from "moment";
import * as Icon from "react-bootstrap-icons";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import {Button, Form, Card} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        `http://localhost:5000/api/v1/user/login`,
        qs.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      )
      .then((response) => {
        if (!response.data.success) {
          this.setState({
            formErr: "Incorrect username or password, please re-enter",
          });
          return;
        }

        this.props.cookies.set("token", response.data.token, {
          path: "/",
          expires: moment.unix(response.data.expiresAt).toDate(),
        });

        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        this.setState({
          formErr: "Incorrect username or password, please re-enter",
        });
      });
  }

  render() {
    return (
      <div className="Login  ">
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
          <Card.Title style={{marginTop: "10px"}}>Login</Card.Title>
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
                {this.state.formErr !== "" ? (
                  <div className="form-group">
                    <p style={{color: "red"}}>{this.state.formErr}</p>
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>
              <Button block size="lg" type="submit">
                Login
              </Button>
              Not a user yet? Click{" "}
              <a href="/register" block size="lg">
                here
              </a>{" "}
              to register
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default withRouter(withCookies(Login));
