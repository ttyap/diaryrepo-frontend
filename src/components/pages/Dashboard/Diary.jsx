import React from "react";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";
import Moment from "moment";
import {baseURL} from "../../../services/api";

import {withCookies} from "react-cookie";
import {Container, Card, CardDeck} from "react-bootstrap";

class Diary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diary: [],
    };
  }
  handleDelete = (e, itemId) => {
    axios
      .delete(`${baseURL}/diaryentry/${itemId}`, {
        headers: {
          token: this.props.cookies.get("token"),
        },
      })
      .then((response) => {
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
      .get(`${baseURL}/diaryentry`, {
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
              return (
                <div className="diary">
                  <Container>
                    <CardDeck>
                      {" "}
                      <Card
                        style={{
                          marginTop: "20px",
                          width: "200px",
                          marginBottom:"10px"
                        }}
                      >
                        {" "}
                        <Card.Title
                          style={{
                            fontWeight: "bold",
                            fontSize: "15px",
                            textAlign: "left",
                            marginTop:"5px",

                            marginLeft:"5px"
                          }}
                        >
                          {Moment(result.created_at).format("ddd Do MMM YYYY, HH:mm")}
                          <Icon.Trash
                            style={{
                              marginLeft: "20px",
                            }}
                            onClick={(e) => this.handleDelete(e, result._id)}
                          ></Icon.Trash>
                        </Card.Title>
                        <Card.Text style={{textAlign: "left", marginLeft:"5px"}}>{result.text}</Card.Text>
                      </Card>
                    </CardDeck>
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
