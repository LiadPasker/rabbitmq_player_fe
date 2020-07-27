import React, { Component } from "react";
import "./App.css";
import Player from "./conponents/player/player";
import MainLogo from "./assets/1200px-RabbitMQ_logo.svg_player.png";
import Navbar from "./conponents/navbar";
import StateView from "./conponents/state_view";
import TimeCounter from "./conponents/time_counter";
import FilePreview from "./conponents/file_preview";

class App extends Component {
  state = {
    files: [],
    currPlayingIdx: -1,
    exchanges: [],
  };

  frameStyle = {
    backgroundColor: "#eeeeee",
    border: "1px solid black",
    borderRadius: "5px",
  };

  constructor(props) {
    super();
    console.log("App >> ctor");
    this.importBtnRef = React.createRef();
    this.playerRef = React.createRef();
    this.playerIndicatorRef = React.createRef();
    this.importBtnRef = React.createRef();
  }

  render() {
    return (
      <div className="App">
        <div style={{ height: "12vh" }}>
          {this.renderNavBar()}
          {this.changeImportFileBtnName()}
        </div>
        <div className="row  overflow-hidden" style={{ height: "85vh" }}>
          <div className="col-8">
            <div className="d-flex flex-row flex-wrap align-items-center ">
              <div className="w-100 mb-2" style={this.frameStyle}>
                <TimeCounter countDownTime="0" />
              </div>
              <div className="w-100 mb-2" id="player" style={this.frameStyle}>
                {this.renderPlayer()}
              </div>
              <div style={this.frameStyle} className="w-100 overflow-hidden">
                <FilePreview file={this.getJsonExample()} />
              </div>
            </div>
          </div>

          <div className="col-4 h-100">
            <div className=" h-100 overflow-auto" style={this.frameStyle}>
              {this.renderDetails()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  getJsonExample = () => {
    let json = JSON.parse(
      '{ "a": 9,"b":9,"c":9,"d":9,"e":9,"f":9,"g":9,"h":9,"i":9,"j":9,"k":9,"m":9,"l":9,"o":9,"p":9,"q":9,"r":9,"s":9,"t":9}'
    );
    return JSON.stringify(json, undefined, 2);
  };

  renderNavBar = () => {
    return (
      <div className="row">
        <div className="col-6">{this.renderLogo()}</div>
        <div
          className="col-6"
          id="NavBar_Buttons"
          // style={{ border: "1px solid black" }}
        >
          <div style={{ float: "right" }}>{this.renderNavBarButtons()}</div>
        </div>
      </div>
    );
  };

  renderNavBarButtons = () => {
    return (
      <div>
        <Navbar
          id="settings"
          updateFiles={this.updateImportedFiles}
          importBtnRef={this.importBtnRef}
        />
      </div>
    );
  };

  renderPlayer = () => {
    return (
      <Player
        key="1"
        msg_cnt="30"
        playerWidth="1"
        playerHeight="100px"
        playerRef={this.playerRef}
        playerIndicatorRef={this.playerIndicatorRef}
        //currFile={this.state.files[this.state.currPlayingIdx].details}
      />
    );
  };

  renderLogo = () => {
    return (
      <div className="m-2">
        <img src={MainLogo} alt="rabbitmq_logo" width="60%" className="m-3" />
      </div>
    );
  };

  isServerConnected = () => {
    return this.state.isServerConnected ? "Connected" : "Not Connected";
  };

  renderDetails = () => {
    const generalInfo = {
      server_status: this.isServerConnected(),
      file_count: this.state.files.length,
      currently_playing:
        this.state.currPlayingIdx === -1
          ? "No File to Play"
          : this.state.files[this.state.currPlayingIdx].details.name,
    };

    return (
      <StateView
        id="StateView"
        generalInfo={generalInfo}
        exchanges={this.state.exchanges}
        files={this.state.files}
        onDelete={this.onFileDelete}
      />
    );
    //return <div>{this.state.files[0]}</div>;
  };

  updateImportedFiles = (files) => {
    if (files.length === 0) return;
    let currfiles = [...this.state.files];
    for (const file of files) {
      const fileStr = JSON.stringify(file);
      let contains = currfiles.some((item) => {
        return JSON.stringify(item) === fileStr;
      });

      if (!contains) {
        currfiles.push(file);
      }
    }

    const currPlayingIdx =
      this.state.currPlayingIdx === -1 ? 0 : this.state.currPlayingIdx;
    this.changeImportFileBtnName(files);
    this.setState({ files: currfiles, currPlayingIdx });
  };

  changeImportFileBtnName = () => {
    const files = this.state.files;
    if (!this.importBtnRef.current) return;
    if (files.length <= 0) {
      this.importBtnRef.current.innerHTML = "Import Files";
      return;
    }
    let newText = "Imported Files - ";
    if (files.length > 1) newText += `List(${files.length})`;
    else newText += files[0].file.name;
    this.importBtnRef.current.innerHTML = newText;
  };

  onFileDelete = (fileIdx) => {
    let newFiles = [...this.state.files];
    let currPlayingIdx = this.state.currPlayingIdx;
    newFiles.splice(fileIdx, 1);
    if (newFiles.length === 0) currPlayingIdx = -1;
    this.setState({ files: newFiles, currPlayingIdx });
  };
}

export default App;
