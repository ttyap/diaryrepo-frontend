import React from "react";
import axios from "axios";
import qs from "qs";
import {baseURL} from "../../services/api";

import "./Form.css";
import {withCookies} from "react-cookie";

import {Button, Form, Card, Container} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class TodolistForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
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
        `${baseURL}/todolist`,
        qs.stringify({
          text: this.state.text,
        }),
        {
          headers: {
            token: this.props.cookies.get("token"),
          },
        }
      )
      .then((response) => {
        if (!response.data.success) {
          this.setState({
            formErr: "Error occurred in form, please check values",
          });
          return;
        }
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
      <div className="Todolist ">
        <Container>
          <Card
            style={{
              marginTop: "20px",
              width: "100%",
              height: "100%",
              opacity: "95%",
              padding: "50px",
            }}
          >
            <Card.Header>
              <h1>Add task</h1>
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  this.handleFormSubmission(e);
                }}
              >
                <Form.Group size="lg" controlId="username">
                  <Form.Label>Task</Form.Label>
                  <Form.Control
                                      placeholder="Please remember to.."

                    autoFocus
                    as="textarea"
                    rows={5}
                    type="text"
                    name="text"
                    onChange={(e) => {
                      this.handleInputChange(e);
                    }}
                  />
                </Form.Group>

                <Button block size="lg" type="submit">
                  Add to list
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default withCookies(TodolistForm);
