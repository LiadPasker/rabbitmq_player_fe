import React, { Component } from "react";

class TimeCounter extends Component {
  state = {
    toPlay: true,
    countDownTime: this.props.countDownTime,
    intvl: undefined,
    //cdRef: React.createRef(),
  };
  render() {
    console.log("TimeCounter");
    return (
      <React.Fragment>
        {this.start()}
        <h4 style={{ width: "100%" }}>
          <span className="m-3" style={{ color: "#f93f10" }}>
            Next Message Countdown
            <span style={{ fontSize: "50%" }}>(seconds)</span>:
          </span>
          <span ref={this.state.cdRef}>{this.state.countDownTime}</span>
        </h4>
      </React.Fragment>
    );
  }

  start = () => {
    if (this.state.countDownTime <= 0 || !this.state.toPlay)
      clearInterval(this.state.intvl);
    if (this.state.intvl !== undefined) return;
    const intvl = setInterval(() => {
      const newCdVal =
        this.state.countDownTime - 1 <= 0 ? 0 : this.state.countDownTime - 1;
      if (!this.state.toPlay) clearInterval(this.state.intvl);
      this.setState({
        countDownTime: newCdVal,
        intvl: intvl,
      });
    }, 1000);

    //this.setState({ intvl: intvl });
  };
}

export default TimeCounter;
