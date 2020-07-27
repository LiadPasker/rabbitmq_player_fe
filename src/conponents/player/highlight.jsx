import React, { Component } from "react";

class PlayerHighlight extends Component {
  render() {
    console.log("PlayerHighlight >> render");

    return (
      <div>
        <canvas
          id="hightlight"
          width={this.props.highlightHeight}
          height={this.props.highlightHeight}
          ref={this.props.id}
          style={{
            position: "fixed",
            left: this.props.posLeft,
          }}
        />
      </div>
    );
  }

  componentDidMount() {
    this.drawPlayerHighlight();
  }

  drawPlayerHighlight() {
    const canvas = this.refs[this.props.id];
    if (canvas === null) return;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;

    // upper circl
    ctx.fillStyle = "LightBlue";
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.bezierCurveTo(0, 0, canvas.width, 0, canvas.width, 20);
    ctx.fill();
    ctx.stroke();

    // bottom triangle
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.lineTo(canvas.height / 2, canvas.height);
    ctx.lineTo(canvas.height, 20);
    ctx.fill();
    ctx.stroke();
  }
}

export default PlayerHighlight;
