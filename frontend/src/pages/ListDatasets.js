import React, { Component } from "react";
import SocketRequestBuilder from "../SocketRequestBuilder";
import "../css/ListDatasets.css";

export default class ListDatasets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            items: []
        };

        // Download all of the data and save them to the state.
        SocketRequestBuilder.makeRequest("GetDatasetCount", {}).then(data => {
            // This will contain the count of datasets.

            const count = data.body.count;

            this.setState({
                count: count,
                items: []
            });

            for(let i = 0; i < count; i++) {
                // Loop through this and download each item, then check if that exists (some could be deleted...)
                SocketRequestBuilder.makeRequest("GetDataset", {id: i}).then(data => {
                    if(data.body.exists) { // This dataset exists
                        let oldState = this.state;
                        oldState.items.push(data.body); // We want to append not override!
                        this.setState(oldState);
                    }
                });
            }
        });
    }

    render() {
        let datasetItemArray = [];

        this.state.items.forEach(itm => {
            datasetItemArray.push((
                <div className="DatasetItem col-12">
                    <div className="row">
                        <div className="col-3">
                            <div>
                                <h1>#{itm.dataset.id}</h1>
                            </div>
                        </div>
                        <div className="col-6">
                            <div>
                                <p>{itm.dataset.dataPoints.length},{itm.dataset.description}</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div>
                                <p style={{
                                    textAlign: "right"
                                }}><i className="fas fa-angle-right" /></p>
                            </div>
                        </div>
                    </div>
                </div>
            ));
        });

        return (
            <div className="col-12">
                <h4>There are a total of {this.state.count} datasets.</h4>
                <hr />

                <div className="row">
                    {datasetItemArray}
                </div>
            </div>
        );
    }
}