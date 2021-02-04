import React from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import qs from "qs";
import moment from "moment";
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
            formErr: "Error occurred in form, please check values",
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
          formErr: "Error in form, please check values",
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
          <Card.Header>
            <h2>Login</h2>
          </Card.Header>
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
              </Form.Group>

              <Button block size="lg" type="submit">
                Login
              </Button>
              <Button href="/register" block size="lg">
                Register
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default withRouter(withCookies(Login));
