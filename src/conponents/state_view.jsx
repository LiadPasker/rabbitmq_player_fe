import React, { Component } from "react";
import "./state_view.css";

class StateView extends Component {
  render() {
    return (
      <React.Fragment>
        {this.renderDetails()}
        {this.renderExchanges()}
        {this.renderFileTable()}
      </React.Fragment>
    );
  }

  renderExchanges = () => {
    const { exchanges } = this.props.exchanges;
    return (
      <React.Fragment>
        <h6>
          <span className="col" style={{ color: "#f93f10" }}>
            Exchanges:
          </span>
        </h6>
        <table className="table">
          {this.renderTableHeader(["#", "Exchange Name", "Status"])}
          <tbody>
            {exchanges?.map((exchange, index) => {
              return (
                <tr id={index} className="brighter">
                  <th scope="row">{index}</th>
                  <td>{exchange.name}</td>
                  <td>{exchange.status}</td>
                  <td
                    id="button_del"
                    onClick={() => {
                      this.props.onDisconnectExchange(index);
                    }}
                  >
                    X
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  };

  renderDetails = () => {
    console.log("rendering details...");
    const generalInfo = this.props.generalInfo;
    return (
      <div className="mb-5 mt-2">
        {Object.keys(generalInfo).map((key) => {
          return (
            <h6 key={key}>
              <span className="col" style={{ color: "#f93f10" }} key={key}>
                {key}:
              </span>
              <span className="">{generalInfo[key]}</span>
            </h6>
          );
        })}
      </div>
    );
  };
  renderFileTable = () => {
    //if (!this.props.files || this.props.files.length === 0) return;
    return (
      <React.Fragment>
        <h6>
          <span className="col" style={{ color: "#f93f10" }}>
            Files:
          </span>
        </h6>
        <table className="table">
          {this.renderTableHeader(["#", "Name", "Type", "Last Modified"])}
          {this.renderFileTableRows()}
        </table>
      </React.Fragment>
    );
  };

  renderFileTableRows = () => {
    return (
      <tbody>
        {this.props.files.map((fileObj, index) => {
          return (
            <tr id={index} className="brighter">
              <th scope="row">{index}</th>
              <td>{fileObj.details.name}</td>
              <td>{fileObj.details.type}</td>
              <td>{fileObj.details.lastModifiedDate.toUTCString()}</td>
              <td
                id="button_del"
                onClick={() => {
                  this.props.onDelete(index);
                }}
              >
                X
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  renderTableHeader = (headers) => {
    return (
      <thead key="thead" id="state_view_table_header">
        <tr>
          {headers.map((header, index) => {
            return (
              <th scope="col" key={index}>
                {header}
              </th>
            );
          })}
          <th scope="col" key="4"></th>
        </tr>
      </thead>
    );
  };
}

export default StateView;
