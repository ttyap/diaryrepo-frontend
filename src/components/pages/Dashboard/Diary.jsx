import React from "react";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";

import {withCookies} from "react-cookie";
import {Container, Card, CardGroup} from "react-bootstrap";

class Diary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diary: [],
    };
  }
  handleDelete = (e, itemId) => {
    axios
      .delete(`http://localhost:5000/api/v1/diaryentry/${itemId}`, {
        headers: {
          token: this.props.cookies.get("token"),
        },
      })
      .then((response) => {
        console.log(this.state.diary);
        console.log(itemId);
        const newState = this.state.diary.filter(function (entry) {
          return entry._id !== itemId;
        });
        this.setState({
          diary: newState,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/v1/diaryentry", {
        headers: {
          token: this.props.cookies.get("token"),
        },
      })

      .then((response) => {
        console.log(response);
        this.setState({
          diary: response.data.text,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="diary">
        {this.state.diary.length !== 0 ? (
          <div className="diary-content">
            {this.state.diary.map((result) => {
              console.log(result);
              return (
                <div className="diary">
                  <Container>
                    <CardGroup>
                      {" "}
                      <Card
                        style={{
                          marginTop: "20px",
                        }}
                      >
                        {" "}
                        <Card.Header
                          style={{
                            fontWeight: "bold",
                            textAlign: "left",
                          }}
                        >
                          {result.created_at}
                          <Icon.Trash
                            onClick={(e) => this.handleDelete(e, result._id)}
                          ></Icon.Trash>
                        </Card.Header>
                        <Card.Text style={{textAlign: "left"}}>{result.text}</Card.Text>
                      </Card>
                    </CardGroup>
                  </Container>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No entry found</p>
        )}
      </div>
    );
  }
}
export default withCookies(Diary);
