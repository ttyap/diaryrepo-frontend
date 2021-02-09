import React from "react";
import {VictoryPie, VictoryLabel} from "victory";
import axios from "axios";
import {withCookies} from "react-cookie";

class Mood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moodList: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/v1/mood", {
        headers: {
          token: this.props.cookies.get("token"),
        },
      })

      .then((response) => {
        this.setState({
          moodList: response.data.mood,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <svg viewBox="0 0 700 700">
        <VictoryPie
          colorScale={["tomato", "orange", "gold", "violet", "navy", "teal"]}
          standalone={false}
          width={700}
          height={700}
          data={this.state.moodList.map((result) => {
            return {
              x: result._id,
              y: result.count,
              label: result._id,
            };
          })}
          labelRadius={100}
          style={{
            labels: {
              fontSize: 30,
              fill: "white",
              fontWeight: "bolder",
              writingMode: "vertical-rl",
              textOrientation: "upright",
            },
          }}
        />
      </svg>
    );
  }
}
export default withCookies(Mood);
