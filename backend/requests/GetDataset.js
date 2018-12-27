import APIRequest from "./APIRequest";
import CurrentAccessor from "../../frontend/src/shared/CurrentAccessor";

export default class GetDataset extends APIRequest {
    constructor() {
        super("Gets a Dataset.", 
            "Returns a Dataset object when a valid DataSetId is provided.",
            {
                id: {
                    critical: true,
                    description: "The dataset that is wanted."
                }
            });
    }
    
    async getResponse(data) {
        let dataset = await CurrentAccessor.getDataSaver().getDataset(parseInt(data.id));

        return {
            exists: dataset !== null,
            dataset: dataset
        };
    }
}