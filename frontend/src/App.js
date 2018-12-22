import React, { Component } from 'react';
import { Button } from "reactstrap";
import User from "./local/User";
import LeftBarItem from "./LeftBarItem";
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import CurrentAccessor from "./shared/CurrentAccessor";
import Navigation from "./Navigation";

import "./css/App.css";

class App extends Component {
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

export default App;
