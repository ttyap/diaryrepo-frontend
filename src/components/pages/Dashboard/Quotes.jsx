import React from "react";
import axios from "axios";

class Quotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
    };
  }

  componentDidMount() {
    this.loadRandomQuote();
  }

  loadRandomQuote() {
    axios
      .get("https://goquotes-api.herokuapp.com/api/v1/random?count=1")
      .then((response) => {
        this.setState({
          quotes: response.data.quotes,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="quotes">
        <div className="quotes-content">
          {this.state.quotes.map((result) => {
            return (
              <div className="quotes">
                <div className="quotes-content">
                  <p style={{textAlign: "left"}}> {result.text}</p>
                  <p style={{textAlign: "right", fontWeight: "bold", fontStyle: "italic"}}>
                    {" "}
                    - {result.author}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Quotes;
