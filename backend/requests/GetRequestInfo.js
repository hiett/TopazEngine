import APIRequest from "./APIRequest";
import App from "../App";

export default class GetRequestInfo extends APIRequest {
    constructor() {
        super("Gets Request Info",
            "Returns information about a given Request name.",
            {
                name: {
                    critical: true,
                    description: "The request that info is wanted on."
                }
            });
    }

    async getResponse(data) {
        // Get the dataset.
        const reqStorage = App.getInstance().requestManager.reqStorage;

        if(reqStorage[data.name] === undefined) {
            // This request is not defined, return an error
            return {
                error: "Unknown request.",
                knownRequests: Object.keys(reqStorage)
            };
        }

        const item = reqStorage[data.name];

        return {
            storedName: data.name,
            name: item.reqName,
            description: item.reqDescription,
            headers: item.headerData
        };
    }
}