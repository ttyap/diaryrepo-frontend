import React from "react";
import axios from "axios";
import qs from "qs";
import * as Icon from "react-bootstrap-icons";

import "./Todolist.css";

import {withCookies} from "react-cookie";

class Todolist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todolist: [],
    };
  }

  handleDelete = (e, itemId) => {
    axios
      .delete(`http://localhost:5000/api/v1/todolist/${itemId}`, {
        headers: {
          token: this.props.cookies.get("token"),
        },
      })
      .then((response) => {
        this.setState({
          todolist: this.state.todolist.filter(function (entry) {
            return entry._id !== itemId;
          }),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleClick = (e, itemId) => {
    if (e.target.className === "strikeThrough") return;
    e.target.classList.toggle("strikeThrough");
    axios.patch(
      `http://localhost:5000/api/v1/todolist/${itemId}`,
      qs.stringify({
        task_status: "done",
      }),
      {
        headers: {
          token: this.props.cookies.get("token"),
        },
      }
    );
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/v1/todolist", {
        headers: {
          token: this.props.cookies.get("token"),
        },
      })

      .then((response) => {
        console.log(response.data.text);
        this.setState({
          todolist: response.data.text,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="todolist">
        {this.state.todolist.length !== 0 ? (
          <div className="todolist-content">
            {this.state.todolist.map((result) => {
              return (
                <div>
                  <p
                    className={result.task_status === "done" ? "strikeThrough" : null}
                    style={{textAlign: "left"}}
                    onClick={(e) => this.handleClick(e, result._id)}
                  >
                    {result.text}
                    <Icon.Trash
                      style={{marginLeft: "20px"}}
                      onClick={(e) => this.handleDelete(e, result._id)}
                    ></Icon.Trash>
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No task added</p>
        )}
      </div>
    );
  }
}
export default withCookies(Todolist);
