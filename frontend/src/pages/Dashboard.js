import React, { Component } from "react";

import "./../css/Dashboard.css";

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-4">
                            <div className="DashboardItem">
                                <h4>This is a block title</h4>
                                <p>This is some block content</p>
                            </div>
                        </div>
                        
                        <div className="col-4">
                            <div className="DashboardItem">
                                <h4>This is a block title</h4>
                                <p>This is some block content</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}