import React from "react";
import {Form, Card, Container, Button, Row, Col} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import "./Form.css";
import axios from "axios";
import qs from "qs";

class MoodForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: "",
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
        `http://localhost:5000/api/v1/mood`,
        qs.stringify({
          mood: this.state.mood,
        })
      )
      .then((response) => {
        console.log(response);
        if (!response.data.success) {
          this.setState({
            formErr: "Error occurred in form, please check values",
          });
          return;
        }
        this.props.history.push("/diary");
      })

      .catch((err) => {
        this.setState({
          formErr: "Error in form, please check values",
        });
      });
  }

  render() {
    return (
      <div className="Mood  ">
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
              <h1>How are you feeling today?</h1>
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  this.handleFormSubmission(e);
                }}
              >
                <Form.Group as={Row}>
                  <Col>
                    {" "}
                    <Form.Check
                      type="radio"
                      name="mood"
                      id="mood"
                      value="1"
                      onChange={(e) => {
                        this.handleInputChange(e);
                      }}
                    />{" "}
                    <Form.Check.Label style={{fontSize: "30px"}}>
                      Angry <Icon.EmojiAngry></Icon.EmojiAngry>{" "}
                    </Form.Check.Label>
                    <Form.Check
                      type="radio"
                      name="mood"
                      id="mood"
                      value="2"
                      onChange={(e) => {
                        this.handleInputChange(e);
                      }}
                    />
                    <Form.Check.Label style={{fontSize: "30px"}}>
                      Not good <Icon.EmojiFrown></Icon.EmojiFrown>{" "}
                    </Form.Check.Label>
                    <Form.Check
                      type="radio"
                      name="mood"
                      id="mood"
                      value="3"
                      onChange={(e) => {
                        this.handleInputChange(e);
                      }}
                    />
                    <Form.Check.Label style={{fontSize: "30px"}}>
                      Meh <Icon.EmojiNeutral></Icon.EmojiNeutral>{" "}
                    </Form.Check.Label>
                    <Form.Check
                      type="radio"
                      name="mood"
                      id="mood"
                      value="4"
                      onChange={(e) => {
                        this.handleInputChange(e);
                      }}
                    />{" "}
                    <Form.Check.Label style={{fontSize: "30px"}}>
                      Good <Icon.EmojiSmile></Icon.EmojiSmile>{" "}
                    </Form.Check.Label>
                    <Form.Check
                      type="radio"
                      name="mood"
                      id="mood"
                      value="5"
                      onChange={(e) => {
                        this.handleInputChange(e);
                      }}
                    />{" "}
                    <Form.Check.Label style={{fontSize: "30px"}}>
                      Having a blast <Icon.EmojiLaughing></Icon.EmojiLaughing>{" "}
                    </Form.Check.Label>
                    <Form.Check
                      type="radio"
                      name="mood"
                      id="mood"
                      value="6"
                      onChange={(e) => {
                        this.handleInputChange(e);
                      }}
                    />{" "}
                    <Form.Check.Label style={{fontSize: "30px"}}>
                      Loved <Icon.EmojiHeartEyes></Icon.EmojiHeartEyes>{" "}
                    </Form.Check.Label>
                  </Col>
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default MoodForm;
