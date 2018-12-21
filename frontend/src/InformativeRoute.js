import React, { Component } from "react";
import { Route } from "react-router-dom";

let routeInfoCache = {};
let blankData = {
    name: "Unknown",
    nPath: "Unknown"
};

export default class InformativeRoute extends Component {
    constructor(props) {
        super(props);
        
        console.log("Exact is", this.props.exact);
        
        routeInfoCache[this.props.path] = {
            name: this.props.name,
            nPath: this.props.nPath
        };
        
        console.log("Created an informative route for ", this.props.path);
        
        console.log("Route info cache:", routeInfoCache);
    }
    
    render() {
        return <Route path={this.props.path} component={this.props.component} />;
    }
    
    static getRouteInfo(routePath) {
        return routeInfoCache[routePath] !== undefined ? routeInfoCache[routePath] : blankData;
    }
}