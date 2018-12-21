import express from "express";
import logger from "./logger";
import bodyParser from "body-parser";

import RequestManager from "./RequestManager";
import UnitTesting from "./UnitTesting";
import ServerDataSaver from "./ServerDataSaver";

import CurrentAccessor from "./../frontend/src/shared/CurrentAccessor";

let appInstance = null;

export default class App {
    constructor() {
        // Create the current accessor that the shared code requires.
        CurrentAccessor.setIsServer(true);
        CurrentAccessor.setDataSaver(new ServerDataSaver());
        
        this.app = express();
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.listen(8081);
        
        logger.log("Starting Topaz Engine");
        
        // Register the requests.
        this.requestManager = new RequestManager();
    }
    
    startProcesses() {
        
        //TEST:
        this.unitTesting = new UnitTesting();
        this.unitTesting.testRequest("GetDataset", {debugText: "Hey!"});
    }
    
    static getInstance() {
        return appInstance;
    }
}

logger.log("Creating instance.");

appInstance = new App();
appInstance.requestManager.loadRequests();
appInstance.startProcesses();