import logger from "./logger";
import read from "read-data";
import app from "./App";

export default class RequestManager {
    constructor(io) {
        this.io = io;

        this.reqStorage = {};
    }

    loadRequests() {
        // Load from file
        this.requests = read.sync("config/requests.json").data;

        this.requests.forEach(req => {
            this.registerRequest(req);
        });

        // Register the reqs listener.
        app.getInstance().app.post("/api/:wantedreq", (req, res) => {
            const wantedReq = req.params.wantedreq;

            // Check if this req exists
            if(this.reqStorage[wantedReq] === undefined) {
                res.json({
                    wantedRequest: wantedReq,
                    error: "That request is not defined."
                });

                return;
            }

            this.reqStorage[wantedReq].getResponse(req.body).then(responseData => res.json(responseData));
        });

        this.io.on("connection", socket => {
            logger.log("A new client connected.");

            socket.on("MakeRequest", (dataObject) => {
                logger.log("Client sent a request over socket. The wanted request is: " + dataObject.wantedRequest);
                logger.log("Sent object to follow.");
                logger.log(dataObject);

                if(dataObject === undefined) {
                    dataObject = {}; // Stop erroring!
                }

                // Check if this req exists
                if(this.reqStorage[dataObject.wantedRequest] === undefined) {
                    socket.emit("RequestResponse", {
                        wantedRequest: dataObject.wantedRequest,
                        isTest: dataObject.isTest === undefined ? false : dataObject.isTest,
                        error: "That request is not defined."
                    });
                } else {
                    this.reqStorage[dataObject.wantedRequest].getResponse(dataObject.body).then(responseData => {
                        socket.emit("RequestResponse", {
                            wantedRequest: dataObject.wantedRequest,
                            isTest: dataObject.isTest === undefined ? false : dataObject.isTest,
                            body: responseData
                        });
                    });
                }
            });
        });
    }

    registerRequest(reqFile) {
        logger.log("Adding request " + reqFile + ".");
        
        this.reqStorage[reqFile] = new (require("./requests/" + reqFile)).default();
    }
}
