import React from "react";
import {Form, Card, Container, Button} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import "./Form.css";
import axios from "axios";
import qs from "qs";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import {withCookies} from "react-cookie";

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
    console.log(this.props.cookies.get("token"));
    axios
      .post(
        `http://localhost:5000/api/v1/mood`,
        qs.stringify({
          mood: this.state.mood,
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
                margin: "0 auto",
                float: "none",
                marginBottom: "10px",
                marginTop: "20px",
                width: "100%",
              height: "100%",
              opacity: "95%",
              padding: "50px",
            }}
          >
            <Card.Header>
              <h1>How are you feeling right now?</h1>
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  this.handleFormSubmission(e);
                }}
              >
                <Form.Check>
                  <Form.Check.Input
                    type="radio"
                    name="mood"
                    id="mood"
                    value="1"
                    style={{marginTop: "20px"}}
                    onChange={(e) => {
                      this.handleInputChange(e);
                    }}
                  />
                  <Form.Check.Label style={{fontSize: "30px"}}>
                    Angry <Icon.EmojiAngry></Icon.EmojiAngry>
                  </Form.Check.Label>{" "}
                </Form.Check>{" "}
                <Form.Check>
                  <FormCheckInput
                    type="radio"
                    name="mood"
                    id="mood"
                    value="2"
                    style={{marginTop: "20px"}}
                    onChange={(e) => {
                      this.handleInputChange(e);
                    }}
                  />

                  <Form.Check.Label style={{fontSize: "30px"}}>
                    Sad <Icon.EmojiFrown></Icon.EmojiFrown>{" "}
                  </Form.Check.Label>
                </Form.Check>
                <Form.Check>
                  {" "}
                  <FormCheckInput
                    type="radio"
                    name="mood"
                    id="mood"
                    value="3"
                    style={{marginTop: "20px"}}
                    onChange={(e) => {
                      this.handleInputChange(e);
                    }}
                  />
                  <Form.Check.Label style={{fontSize: "30px"}}>
                    Meh <Icon.EmojiNeutral></Icon.EmojiNeutral>{" "}
                  </Form.Check.Label>
                </Form.Check>
                <Form.Check>
                  {" "}
                  <FormCheckInput
                    type="radio"
                    name="mood"
                    id="mood"
                    value="4"
                    style={{marginTop: "20px"}}
                    onChange={(e) => {
                      this.handleInputChange(e);
                    }}
                  />
                  <Form.Check.Label style={{fontSize: "30px"}}>
                    Good <Icon.EmojiSmile></Icon.EmojiSmile>{" "}
                  </Form.Check.Label>
                </Form.Check>
                <Form.Check>
                  {" "}
                  <FormCheckInput
                    type="radio"
                    name="mood"
                    id="mood"
                    value="5"
                    style={{marginTop: "20px"}}
                    onChange={(e) => {
                      this.handleInputChange(e);
                    }}
                  />
                  <Form.Check.Label style={{fontSize: "30px"}}>
                    Gr8 <Icon.EmojiLaughing></Icon.EmojiLaughing>{" "}
                  </Form.Check.Label>
                </Form.Check>
                <Form.Check>
                  {" "}
                  <FormCheckInput
                    type="radio"
                    name="mood"
                    id="mood"
                    value="6"
                    style={{marginTop: "20px"}}
                    onChange={(e) => {
                      this.handleInputChange(e);
                    }}
                  />
                  <Form.Check.Label style={{fontSize: "30px"}}>
                    Loved <Icon.EmojiHeartEyes></Icon.EmojiHeartEyes>{" "}
                  </Form.Check.Label>
                </Form.Check>
                <Button type="submit">Submit</Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default withCookies(MoodForm);
