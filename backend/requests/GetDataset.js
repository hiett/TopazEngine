import APIRequest from "./APIRequest";

export default class GetDataset extends APIRequest {
    constructor() {
        super("Gets a Dataset.", 
            "Returns a Dataset object when a valid DataSetId is provided.",
            {
                "datasetid": "The ID of the dataset wanted."
            });
    }
    
    getResponse(data) {
        return {content: "This is some test content.", oldData: data};
    }
}