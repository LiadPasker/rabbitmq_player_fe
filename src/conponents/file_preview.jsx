import React, { Component } from "react";

class FilePreview extends Component {
  render() {
    return (
      <React.Fragment>
        <span className="m-4 position-relative float-right font-weight-bold brighter">
          Read More
        </span>
        <div className="m-3" style={{ width: "100%" }}>
          <h4 style={{ color: "#f93f10" }}>Message Preview:</h4>
          {this.renderJson()}
        </div>
      </React.Fragment>
    );
  }

  renderJson = () => {
    return <pre style={{ fontSize: "80%" }}>{this.props.file}</pre>;
  };
}

export default FilePreview;
