import React from "react";
import Diary from "./Diary";
import Mood from "./Mood";
import Todolist from "./Todolist";
import Quotes from "./Quotes";
import * as Icon from "react-bootstrap-icons";
import {Card, Container, Row, Col} from "react-bootstrap";

class Dashboard extends React.Component {
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
              <Col sm={9}>
                <Card
                  style={{
                    marginTop: "20px",
                    height: "100%",
                    opacity: "95%",
                  }}
                >
                  <Card.Header style={{textAlign: "left", fontWeight: "bold"}}>
                    Diary{" "}
                    <a href="/mood">
                      {" "}
                      <Icon.PlusCircle
                        style={{marginBottom: "2px", marginLeft: "5px"}}
                      ></Icon.PlusCircle>{" "}
                    </a>
                  </Card.Header>
                  <Diary />
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Dashboard;
