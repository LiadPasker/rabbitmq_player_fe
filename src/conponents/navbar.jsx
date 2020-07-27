import React, { Component } from "react";
import Modal from "react-modal";
import GeneralSettings from "./general_settings";
import RabbitInjectorSettings from "./rabbit_injector_settings";
import "./navbar.css";

class Navbar extends Component {
  state = {
    showModal: false,
    importBtnRef: undefined,
    settings: undefined,
    settingsRefs: [], // type may be changed
  };

  bg = {
    background: "#FFFF00",
  };

  render() {
    return (
      <div>
        {this.renderImportFiles()}

        <button
          className="btn btn-dark btn-md m-2"
          onClick={this.handleOpenModal}
        >
          Settings
        </button>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          style={this.bg}
          key="modal"
        >
          <div className="bg h-100">
            <button
              className="btn btn-dark btn-md m-2"
              onClick={this.handleCloseModal}
            >
              Close Modal
            </button>
            <GeneralSettings
              //settings={this.state.settings}
              setRefs={this.state.settingsRefs}
              onSettingsUpdate={(settings) => {
                this.handleSettingsUpdate(settings);
              }}
              key="settings"
            />
          </div>
        </Modal>
      </div>
    );
  }

  constructor(props) {
    super();
    console.log("Navbar >> ctor");
    this.state.importBtnRef = props.importBtnRef;
    this.state.settings = new RabbitInjectorSettings();
    for (const key of Object.keys(this.state.settings.rabbitmq)) {
      this.state.settingsRefs[key] = React.createRef();
    }

    for (const key of Object.keys(this.state.settings.messages_settings)) {
      this.state.settingsRefs[key] = React.createRef();
    }

    this.state.showModal = false;
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleSettingsUpdate = (settings) => {
    let elemRefs = { ...this.state.settingsRefs };
    // elemRefs[key] = elem;
    // this.setState({ settingsRefs: elemRefs });
    for (const key of Object.keys(settings.rabbitmq)) {
      elemRefs[key].current.value = settings.rabbitmq[key];
    }

    for (const key of Object.keys(settings.messages_settings)) {
      elemRefs[key].current.value = settings.messages_settings[key];
    }

    this.setState({ settingsRefs: elemRefs });
  };

  /////////////////////////// Import Files: ///////////////////////////
  renderImportFiles = () => {
    return (
      <React.Fragment>
        <input
          type="file"
          //className="btn btn-success btn-md"
          accept="application/json"
          style={{ visibility: "hidden" }}
          multiple={true}
          id="files"
          value=""
          onChange={(e) => {
            this.importFiles(e);
          }}
        ></input>
        <label htmlFor="files" className="btn btn-md btn-outline-dark m-2">
          Import Files
        </label>
      </React.Fragment>
      // <button
      //   ref={this.props.importBtnRef}
      //   className="btn btn-md btn-outline-dark m-2"
      //   onClick={this.importFiles}
      //   style={{ height: "20%" }}
      // >
      //   Import Files
      // </button>
    );
  };

  importFiles = (e) => {
    e.preventDefault();
    let files = [];
    let reader;

    for (const file of e.target.files) {
      reader = new FileReader();
      reader.onload = async (content) => {
        const jsonSettings = content.target.result;
        files.push({
          details: file,
          content: jsonSettings,
        });

        this.props.updateFiles(files);

        //this.props.onSettingsUpdate(JSON.parse(jsonSettings));
      };

      reader.readAsText(file);
    }

    // fileDialog({ multiple: true, accept: "application/json" }).then((files) => {
    //   if (this.valideFiles(files)) {
    //     // this.changeImportFileBtnName(files[0].name);
    //     this.props.updateFiles(files);
    //     console.log("files uploaded successfully!");
    //   }
    // });
  };
}

export default Navbar;
