import React, { Component } from "react";
import PlayerHighligh from "./highlight";
import PlayBtn from "../../assets/play_button.png";
import PauseBtn from "../../assets/pause_button.png";
import StopBtn from "../../assets/stop_button.png";
import RestartBtn from "../../assets/restart_button.png";
import "./player.css";

class Player extends Component {
  state = {
    msgs_cnt: 0,
    currMsgIdx: 0,
    highlights: [],
    playerRef: undefined,
    playerIndicatorRef: undefined,
    isRunning: false,
  };

  constructor(props) {
    super();
    this.state.msgs_cnt = props.msg_cnt;
    this.state.playerWidth = props.playerWidth;
    this.state.playerRef = props.playerRef;
    this.state.playerIndicatorRef = props.playerIndicatorRef;

    console.log("Player >> ctor");
  }

  render() {
    return (
      <div>
        {/* {this.renderHighlights()} */}
        <div className="mb-5">{this.renderUtilsButtons()}</div>
        <div
          className="d-flex align-items-center"
          style={{
            //border: "1px solid black",
            height: this.props.playerHeight,
          }}
        >
          {this.initPlayer()}
          {this.renderCurrMsgCnt()}
        </div>
        <div
          className="d-flex justify-content-center"
          style={{
            //border: "1px solid black",
            height: this.props.playerHeight,
          }}
        >
          {this.renderControlButtons()}
          {/* isRunning: {this.state.isRunning.toString()} */}
        </div>
      </div>
    );
  }

  renderCurrMsgCnt = () => {
    if (this.state.playerRef.current === null) return;
    return (
      <div className="">
        <p
          style={{
            position: "relative",
            fontSize: "150%",
          }}
        >
          {this.state.currMsgIdx + "/" + this.state.msgs_cnt}
        </p>
      </div>
    );
  };

  renderUtilsButtons() {
    return (
      <div>
        <button
          className="btn btn-md btn-dark m-2"
          onClick={() => {
            //this.moveIndicator();
          }}
        >
          Show Previous Message
        </button>
        <button
          className="btn btn-md btn-dark m-2"
          onClick={() => {
            //this.moveIndicator();
          }}
        >
          Show Next Message
        </button>
        <button
          className="btn btn-md btn-success m-2"
          onClick={() => {
            this.moveIndicator();
          }}
        >
          Move Indicator
        </button>
        {/* <button
          className="btn btn-info btn-md m-2"
          onClick={() => {
            this.addPlayerHighlights([100, 0]);
          }}
        >
          Show Highlights
        </button> */}
      </div>
    );
  }

  renderControlButtons = () => {
    let playPauseBtn = { src: PlayBtn, onClick: this.playPause };
    if (this.state.isRunning) {
      playPauseBtn = { src: PauseBtn, onClick: this.playPause };
    }

    const srcs = [
      playPauseBtn,
      //{ src: PauseBtn, onClick: undefined },
      { src: StopBtn, onClick: undefined },
      { src: RestartBtn, onClick: undefined },
    ];
    return srcs.map((btn) => {
      return (
        <img
          src={btn.src}
          alt="img"
          key={btn.src}
          // width="calc("
          // height="50%"
          className="m-3"
          onClick={btn.onClick}
          style={{
            cursor: "pointer",
            height: "70%", //`min(100vh,50vw / ${srcs.length})`,
            //boxShadow: "0 0 20px 10px red",
            //borderRadius: "25px",
            // borderImageSource:
            //   "linear-gradient(50deg, rgb(0,143,104), rgb(250,224,66))",
            // borderImageSlice: 1,
            //border-image-source: "linear-gradient(45deg, rgb(0,143,104), rgb(250,224,66))",
            //border-image-slice: 1
          }}
        />
      );
    });
  };

  playPause = () => {
    this.setState({
      isRunning: !this.state.isRunning,
    });
  };

  componentDidMount() {
    this.drawPlayer();
    this.drawIndicator();

    this.setState({
      msg_width:
        this.state.playerRef.current.width / Number(this.state.msgs_cnt),
    });
  }

  initPlayer() {
    return (
      <div className="m-1" style={{ width: "90%" }}>
        {this.renderTimeLine()}
        {this.renderIndicator()}
      </div>
    );
  }

  renderIndicator = () => {
    return (
      <canvas
        id="indicator"
        width="20"
        height={this.props.playerHeight.replace("px", "") / 3 + "px"}
        ref={this.state.playerIndicatorRef}
        style={{
          position: "relative",
          left: 0,
          //border: "1px solid black",
        }}
      />
    );
  };

  drawIndicator = () => {
    //this.moveIndicator(false, this.state.playerRef.current.offsetLeft);
    if (this.state.playerIndicatorRef.current === null) return;
    const ctx = this.state.playerIndicatorRef.current.getContext("2d");
    if (ctx === null) return;
    ctx.lineWidth = 1;
    ctx.fillStyle = "#f93f10";
    ctx.beginPath();
    ctx.moveTo(this.state.playerIndicatorRef.current.width / 2, 0);
    ctx.lineTo(2, this.state.playerIndicatorRef.current.height - 2);
    ctx.lineTo(
      this.state.playerIndicatorRef.current.width - 2,
      this.state.playerIndicatorRef.current.height - 2
    );
    ctx.lineTo(this.state.playerIndicatorRef.current.width / 2, 0);
    //ctx.bezierCurveTo(0, 0, 4, 0, 4, 20);
    ctx.fill();
    ctx.stroke();
  };

  renderTimeLine = () => {
    return (
      <canvas
        id="player "
        height={this.state.playerWidth}
        ref={this.state.playerRef}
        style={{
          width: "100%",
          position: "relative",
          border: "1px solid #d3d3d3",
        }}
      ></canvas>
    );
  };

  renderHighlights() {
    if (this.state.highlights.length === 0) return;

    return this.state.highlights.map((highlight, idx) => {
      return (
        <PlayerHighligh
          key={idx}
          posLeft={highlight.pos}
          id={idx}
          highlightHeight={this.props.playerHeight.replace("px", "") / 2 + "px"}
        />
        // <div key={highlight} style={{ left: "100px" }}>
        //   liad1
        // </div>
      );
    });
  }

  drawPlayer() {
    this.drawPlayerTimeLine();
    //this.drawPlayerHighlight();
  }

  addPlayerHighlights(positions) {
    if (positions === undefined) return;
    let highlights = [...this.state.highlights];
    for (const position of positions) {
      highlights.push({
        pos: position,
      });
    }

    this.setState({ highlights: highlights });
  }

  drawPlayerTimeLine() {
    const ctx = this.state.playerRef.current.getContext("2d");
    ctx.fillRect(
      0,
      0,
      this.state.playerRef.current.width,
      this.state.playerRef.current.height
    );
  }

  moveIndicator = (next = true, px = undefined) => {
    const currMsgIdx = this.state.currMsgIdx;
    const playerInd = { ...this.state.playerIndicatorRef };
    const player = { ...this.state.playerRef };
    const indLeftVal = Number(playerInd.current.style.left.replace("px", ""));

    if (
      indLeftVal <= player.current.clientWidth - playerInd.current.width &&
      currMsgIdx < this.state.msgs_cnt
    ) {
      let newLeft =
        next === true
          ? indLeftVal + player.current.clientWidth / this.state.msgs_cnt
          : indLeftVal + px;
      if (newLeft + playerInd.current.width > player.current.clientWidth) {
        newLeft = player.current.clientWidth - playerInd.current.width;
      }

      playerInd.current.style.left = newLeft + "px";
      this.setState({
        playerIndicatorRef: playerInd,
        currMsgIdx: next === true ? currMsgIdx + 1 : currMsgIdx,
      });
      //this.state.playerIndicatorRef.current.style.left = newLeft + "px";
    }
  };
}

export default Player;
