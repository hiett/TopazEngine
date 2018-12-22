/* global $ */

import React, { Component } from "react";
import { Button, Input } from "reactstrap";
import ClientSocketManager from "../ClientSocketManager";

let currentInstance = null;

export default class RequestTester extends Component {
    constructor(props) {
        super(props);

        this.state = {
            codeResponse: "Request response will appear here."
        };

        currentInstance = this;
    }

    render() {
        return (
            <div className="col-12">
                <p>This page fires test requests over the connected socket. For completing more detailed (although REST based) requests, Postman is recommended.</p>
                <Input className="InputRequestName" placeholder="Request Name" />
                <br />
                <p>Please use the following box for the request body. Each new line is a new key/value. Separate between key and value with a colon. EG: <b>keyname:keyvalue</b></p>
                <textarea className="InputRequestData" style={{width: "100%", minHeight: "150px"}}>
                </textarea>
                <br />
                <Button color="success" onClick={() => {
                    let buildingObject = {
                        wantedRequest: $(".InputRequestName").val(),
                        isTest: true,
                        body: {}
                    };

                    let rawRequestData = $(".InputRequestData").val();
                    // Split at new lines.
                    rawRequestData.split("\n").forEach(itm => {
                        let parts = itm.split(":");
                        buildingObject.body[parts[0]] = parts[1];
                    });

                    console.log("Building Object is: ", buildingObject);
                    console.log("Sending request.");
                    ClientSocketManager.getSocket().emit("MakeRequest", buildingObject);
                }}>Fire Request</Button>
                <hr />
                <pre>
                    {this.state.codeResponse}
                </pre>
            </div>
        );
    }

    static setCurrentCode(newCode) {
        if(currentInstance == null)
            return;

        currentInstance.setState({
            codeResponse: newCode
        });
    }
}