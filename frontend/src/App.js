import React, { Component } from 'react';
import { Button } from "reactstrap";
import User from "./local/User";
import LeftBarItem from "./LeftBarItem";
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import InformativeRoute from "./InformativeRoute";
import CurrentAccessor from "./shared/CurrentAccessor";

import Dashboard from "./pages/Dashboard";

import "./css/App.css";

class App extends Component {
    render() {
        let routeInfo = InformativeRoute.getRouteInfo(window.location.pathname);
        
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
                    <LeftBarItem linkTo="/" title="Dashboard" icon="tachometer-alt" />
                    <LeftBarItem linkTo="/about" title="About" icon="user-circle" />
                </div>
                
                <div className="ContentArea">  
                    <div className="NavArea">
                        <div className="NavAreaPadding">
                            <div className="NavAreaBar"></div>
                        </div>
                        <div className="NavAreaItem">
                            <h3>{routeInfo.name}</h3>
                        </div>
                        <div className="NavAreaItem">
                            <p>{routeInfo.nPath}</p>
                        </div>
                    </div>
                    
                    <div className="col-12" style={{
                        height: "15px"
                    }}></div>
                    
                    <Switch>
                        <InformativeRoute exact path="/" component={Dashboard} name="Dashboard" nPath="Home / Dashboard" />
                        <InformativeRoute path="/about" component={() => {
                            return <h1>About</h1>;
                        }} name="About" nPath="Home / About" />
                        <Redirect to="/" />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
