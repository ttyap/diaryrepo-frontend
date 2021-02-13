import React from "react";
import axios from "axios";
import qs from "qs";
import "./Form.css";
import {withCookies} from "react-cookie";

import {Button, Form, Card, Container} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Diary extends React.Component {
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
        `http://localhost:5000/api/v1/diaryentry`,
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
      <div className="Diary ">
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
              <h1>New entry</h1>
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  this.handleFormSubmission(e);
                }}
              >
                <Form.Group size="lg" controlId="username">
                  <Form.Control
                    placeholder="Describe your moment.."
                    as="textarea"
                    rows={10}
                    autoFocus
                    type="text"
                    name="text"
                    onChange={(e) => {
                      this.handleInputChange(e);
                    }}
                  />
                </Form.Group>

                <Button block size="lg" type="submit">
                  Add entry
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default withCookies(Diary);
