import React from "react";
import Dashboard from "./pages/Dashboard";
import LeftBarItem from "./LeftBarItem";
import { Route } from "react-router-dom";

// Contains more detailed route information
class RouteWrapper {
    constructor(name, path, icon, nPos, component, exact = false) {
        this.name = name;
        this.path = path;
        this.icon = icon;
        this.nPos = nPos;
        this.component = component;
        this.exact = exact;
    }

    generateLeftBarItem() {
        return <LeftBarItem linkTo={this.path} title={this.name} icon={this.icon} />
    }

    generateRoute() {
        return <Route exact={this.exact} path={this.path} component={this.component} />
    }
}

// Store these as a static instance, this class is simply a wrapper!
let routes = [
    new RouteWrapper("Dashboard", "/", "tachometer-alt", "Home / Dashboard", Dashboard, true),
    new RouteWrapper("About", "/about", "user-circle", "Home / About", () => <p>Hey Welcome to the about page!</p>),
    new RouteWrapper("Test", "/test", "user-circle", "Home / Test", () => <p>Hey</p>)
];

export default class Navigation {
    static getRouteData(path) {
        for(let i = 0; i < routes.length; i++) {
            if(routes[i].path === path) {
                return routes[i];
            }
        }

        return null;
    }

    static getRoutes() {
        return routes;
    }
}