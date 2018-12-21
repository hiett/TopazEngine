import logger from "./../logger";

export default class APIRequest {
    constructor(reqName, reqDescription, headerData) {
        this.reqName = reqName;
        this.reqDescription = reqDescription;
        this.headerData = headerData;
    }
    
    // To be extended on by children
    getResponse(requestDataObject) {
        logger.log("Call was made to APIRequest#getResponse without providing override! Null was returned!");

        return null;
    }
    
    createErrorResponse() {
        logger.log("Call was made to APIRequest#createErrorResponse without providing override! Null was returned!");
        
        return null;
    }
}