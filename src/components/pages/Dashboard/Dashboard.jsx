import React from "react";
import Diary from "./Diary";
import Mood from "./Mood";
import axios from "axios";
import {withCookies} from "react-cookie";

import Todolist from "./Todolist";
import Quotes from "./Quotes";
import * as Icon from "react-bootstrap-icons";
import {Card, Container, Row, Col, Button} from "react-bootstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/v1/user/me", {
        headers: {
          token: this.props.cookies.get("token"),
        },
      })

      .then((response) => {
        this.setState({
          user: response.data.user[0],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.cookies.remove("token", {path: "/"});
    window.location.href = "/";
  }

  render() {
    return (
      <div className="page-dashboard">
        <div className="Dashboard">
          <Container>
            <Row>
              <Col sm={3}>
                <Card
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    width: "250px",
                    opacity: "95%",
                  }}
                >
                  {" "}
                  <Card.Header style={{textAlign: "left", fontWeight: "bold"}}>
                    Mood tracker
                  </Card.Header>
                  <Card.Body>
                    <Mood />
                  </Card.Body>
                </Card>
                <Card
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    width: "250px",
                    opacity: "95%",
                  }}
                >
                  {" "}
                  <Card.Header style={{textAlign: "left", fontWeight: "bold"}}>
                    To-do list
                    <a href="/todolist">
                      <Icon.PlusCircle
                        style={{marginBottom: "2px", marginLeft: "10px"}}
                      ></Icon.PlusCircle>{" "}
                    </a>
                  </Card.Header>
                  <Card.Body>
                    <Todolist />
                  </Card.Body>
                </Card>
                <Card
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    width: "250px",
                    opacity: "95%",
                  }}
                >
                  <Card.Header style={{textAlign: "left", fontWeight: "bold"}}>QOTD </Card.Header>
                  <Card.Body>
                    <Quotes />
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={8}>
                <Card
                  style={{
                    marginTop: "20px",
                    height: "100%",
                    opacity: "95%",
                  }}
                >
                  <Card.Header style={{textAlign: "left", fontWeight: "bold"}}>
                    {this.state.user.username}'s Diary{" "}
                    <a href="/mood">
                      {" "}
                      <Icon.PlusCircle
                        style={{marginBottom: "2px", marginLeft: "5px"}}
                      ></Icon.PlusCircle>{" "}
                    </a>
                  </Card.Header>
                  <Diary />
                </Card>
              </Col>{" "}
              {/* <Col sm={1}> */}
              <Button
                variant="light"
                onClick={() => {
                  this.handleLogout();
                }}
                href="/"
                style={{
                  marginTop: "20px",
                  height: "8%",
                  opacity: "95%",
                }}
              >
                <p2 style={{color: "black", fontWeight: "bold", fontSize: "10px"}}>Logout</p2>

                <Icon.Power style={{color: "black", fontWeight: "bold"}}> </Icon.Power>
              </Button>
              {/* </Col> */}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default withCookies(Dashboard);
