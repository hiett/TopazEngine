import logger from "./logger";
import read from "read-data";
import app from "./App";

export default class RequestManager {
    constructor() {
        this.reqStorage = {};
    }
    
    loadRequests() {
        // Load from file
        this.requests = read.sync("config/requests.json").data;
        
        this.requests.forEach(req => {
            this.registerRequest(req);
        });
    }
    
    registerRequest(reqFile) {
        logger.log("Adding request " + reqFile + ".");
        
        this.reqStorage[reqFile] = new (require("./requests/" + reqFile)).default();
        
        logger.log("Registering request with express.");
        app.getInstance().app.post("/" + reqFile, (req, res) => {
            console.log(req.body);
            
            res.json(this.reqStorage[reqFile].getResponse({test: "Some data"}));
        });
    }
}