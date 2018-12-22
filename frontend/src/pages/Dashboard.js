/* global Chart */

import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import "./../css/Dashboard.css";

export default class Dashboard extends Component {
    render() {
        Chart.defaults.global.defaultFontColor = "#FFF";
        Chart.defaults.global.legend.display = false;

        let data = {
            labels: ["One", "Two", "Three", "Four", "Five", "Six", "Seven"],
            datasets: [
                {
                    label: 'My First dataset',
                    fill: false,
                    lineTension: 0.2,
                    backgroundColor: 'rgba(255,255,255,1)',
                    borderColor: 'rgba(255,255,255,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(255,255,255,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };

        return (
            <div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-4">
                            <div className="DashboardItem">
                                <h4>This is a block title</h4>
                                <p style={{
                                    lineHeight: 0,
                                    paddingTop: "10px"
                                }}>This is some block content</p>
                                <div className="col-12" style={{paddingLeft: 0}}>
                                    <Line data={data} height={250} options={{
                                        maintainAspectRatio: false,
                                        scales: {
                                            xAxes: [{
                                                gridLines: {
                                                    color: "rgba(0, 0, 0, 0)"
                                                },
                                                ticks: {
                                                    userCallback: (value, index, values) => ""
                                                }
                                            }],
                                            yAxes: [{
                                                gridLines: {
                                                    color: "rgba(0, 0, 0, 0)"
                                                },
                                                ticks: {
                                                    userCallback: (value, index, values) => ""
                                                }
                                            }]
                                        },
                                        scaleShowLabels: false
                                    }} />
                                </div>
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
                <div className="col-12">

                </div>
            </div>
        );
    }
}