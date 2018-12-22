import APIRequest from "./APIRequest";

export default class CreateDataset extends APIRequest {
    constructor() {
        super("Creates a Dataset.",
            "Creates a blank Dataset and returns the DataSetId.",
            {
                "time": "The time that the dataset is created, and that offsets should count from.",
                "description": "A description of what the data is for."
            });
    }

    getResponse(data, callback) {
        callback({
            dataSetId: "123321"
        });
    }
}