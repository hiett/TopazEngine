import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import CurrentAccessor from "./shared/CurrentAccessor";
import Navigation from "./Navigation";
import ClientSocketManager, { createClient } from "./ClientSocketManager";
import "./css/App.css";
import RequestTester from "./pages/RequestTester";
import SocketRequestBuilder from "./SocketRequestBuilder";

export default class App extends Component {
    constructor(props) {
        super(props);

        CurrentAccessor.setIsServer(false);

        createClient();
        console.log("Created client: ", ClientSocketManager.getInstance());
        // ClientSocketManager.getSocket().emit("Hey!");
    }

    componentDidMount() {
        // Socket code tests.
        let socket = ClientSocketManager.getSocket();
        socket.emit("MakeRequest", {
            wantedRequest: "GetDataset",
            body: {
                testKey: "testVal"
            }
        });

        socket.on("RequestResponse", data => {
            console.log("Got response from server for request. The data is", data);

            // Check if the request pool contains this
            let reqCallback = SocketRequestBuilder.getRequestPool()[data.requestId];
            if(reqCallback !== undefined) {
                reqCallback(data);
            }
        });
    }

    render() {
        let routeSwitch = [];
        let leftBarLinks = [];

        Navigation.getRoutes().forEach(rte => {
            routeSwitch.push(rte.generateRoute());
            leftBarLinks.push(rte.generateLeftBarItem())
        });

        let pageData = Navigation.getRouteData(window.location.pathname);

        return (
            <div className="App">
                <div className="TopBar">
                    <div className="TopCrossover">
                        <h2>Topaz</h2>
                    </div>
                    <div className="TopBarItem">
                        <p><i className="fas fa-bars"></i></p>
                    </div>
                    <div className="TopBarItem" style={{
                        float: "right"
                    }} onClick={() => {
                        let win = window.open("https://github.com/Sodex234/TopazEngine", "_blank");
                        win.focus();
                    }}>
                        <p style={{
                            fontSize: 18
                        }}>View on GitHub</p>
                    </div>
                </div>
                
                <div className="LeftBar">
                    {leftBarLinks}
                </div>
                
                <div className="ContentArea">  
                    <div className="NavArea">
                        <div className="NavAreaPadding">
                            <div className="NavAreaBar"></div>
                        </div>
                        <div className="NavAreaItem">
                            <h3>{pageData.name}</h3>
                        </div>
                        <div className="NavAreaItem">
                            <p>{pageData.nPos}</p>
                        </div>
                    </div>
                    
                    <div className="col-12" style={{
                        height: "15px"
                    }}></div>

                    <Switch>
                        {routeSwitch}
                    </Switch>
                </div>
            </div>
        );
    }
}
