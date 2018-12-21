import logger from "./logger";
import app from "./App";

export default class UnitTesting {
    testRequest(reqName, dataToParse) {
        logger.log("Unit testing " + reqName + ". Input data is:");
        logger.log(dataToParse);
        
        if(app.getInstance().requestManager.reqStorage[reqName] === undefined) {
            logger.log("[Critical] " + reqName + " is not defined as a request!");
            
            return;
        }
        
        let response = app.getInstance().requestManager.reqStorage[reqName].getResponse(dataToParse);
        
        logger.log("Data received:");
        logger.log(response);
        logger.log("End of " + reqName + " test.");
    }
}