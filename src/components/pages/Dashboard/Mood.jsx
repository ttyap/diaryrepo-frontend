import React from "react";
import {VictoryPie} from "victory";
import axios from "axios";
import {withCookies} from "react-cookie";

class Mood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moodList: [],
      myColorScale:[]
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

    this.state.myColorScale = this.state.moodList.map((result) => {
      if (result._id === "Angry")
        return "#845EC2"
        else if (result._id === "Sad")
        return "#D65DB1"
        
        else if (result._id === "Meh")
        return "#FF6F91"

        else if (result._id === "Good") 
        return "#FF9671"
        
        else if (result._id === "Gr8")
        return "#FFC75F"
        else 
        return "#F9F871"
        
    });
    const data = this.state.moodList.map((result) => {
      return {
        x: result._id,
        y: result.count,
      };
    });

    return (
      <div className="mood">
        {this.state.moodList.length !== 0 ? (      <div className="mood-content">

<svg viewBox="0 0 500 500">
  <VictoryPie
  colorScale={this.state.myColorScale}
    standalone={false}
    width={450}
    height={500}
    data={(data)}
    style={{labels: { fill: "black", fontSize: "20px", fontWeight:"bold"  }}}
  />
</svg>
</div>
): (<p>No mood found</p>)}
      </div>
    );
  }
}
export default withCookies(Mood);
