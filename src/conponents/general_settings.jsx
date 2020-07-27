import React, { Component } from "react";
import RabbitInjectorSettings from "./rabbit_injector_settings";

class GeneralSettings extends Component {
  constructor(props) {
    super();
    console.log("GeneralSettings >> ctor");
    this.settings = new RabbitInjectorSettings();
  }

  render() {
    return (
      <React.Fragment>
        <div className="row" style={{ height: "90%" }}>
          <div className="col">
            <h4 className="mb-3" style={{ color: "#f93f10" }}>
              RabbitMQ Connection Settings
            </h4>
            {this.renderSettings(this.settings.rabbitmq)}
          </div>
          <div className="col">
            <h4 className="mb-3" style={{ color: "#f93f10" }}>
              Message Settings
            </h4>
            {this.renderSettings(this.settings.messages_settings)}
          </div>
        </div>
        <div className="row d-flex justify-content-end">
          <input
            type="file"
            className="btn btn-success btn-md"
            accept="application/json"
            style={{ visibility: "hidden" }}
            id="files"
            value=""
            onChange={(e) => {
              this.LoadSettings(e);
            }}
          ></input>
          <label htmlFor="files" className="btn btn-success btn-md">
            Load Settings
          </label>

          <label
            className="ml-3 btn btn-success btn-md"
            onClick={this.SaveSettings}
          >
            Save Settings
          </label>
        </div>
      </React.Fragment>
    );
  }

  renderSettings = (settings) => {
    return Object.keys(settings).map((key, index) => {
      if (typeof settings[key] === "boolean")
        return this.renderBooleanDropdown(key, this.props.setRefs[key]);
      else {
        const inputElem = this.props.setRefs[key].current;
        return (
          <div className="row form-group" key={"settings" + index}>
            <h6 className="col-5">{key}</h6>
            <input
              type="text"
              ref={this.props.setRefs[key]}
              defaultValue={
                inputElem !== null ? inputElem.value : settings[key]
              }
              className="form-control col-5"
              //onChange={() => this.onSetMsgSetProperty(settings, key)}
            ></input>
          </div>
        );
      }
    });
  };

  renderBooleanDropdown = (key, ref) => {
    return (
      <div className="row form-group" key={"settings" + key}>
        <h6 key className="col-5">
          {key}
        </h6>
        <select
          id="dropdown"
          className="form-control col-5 btn btn-md btn-light"
          ref={ref}
        >
          <option value="True" className="">
            True
          </option>
          <option value="False" className="">
            False
          </option>
        </select>
      </div>
    );
  };

  SaveSettings = () => {
    const settings = this.deriveSettingsFromRefs();
    const fileData = JSON.stringify(settings);
    const blob = new Blob([fileData], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "filename.json";
    link.href = url;
    link.click();
  };

  deriveSettingsFromRefs = () => {
    if (!this.props.setRefs) return;
    let settings = new RabbitInjectorSettings();
    for (const key of Object.keys(settings.rabbitmq)) {
      settings.rabbitmq[key] = this.props.setRefs[key].current.value;
    }

    for (const key of Object.keys(settings.messages_settings)) {
      settings.messages_settings[key] = this.props.setRefs[key].current.value;
    }

    return settings;
  };

  LoadSettings = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const jsonSettings = e.target.result;

      this.props.onSettingsUpdate(JSON.parse(jsonSettings));
    };
    reader.readAsText(e.target.files[0]);
  };

  valideFiles(file) {
    return true;
  }
}

export default GeneralSettings;
