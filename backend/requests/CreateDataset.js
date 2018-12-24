import APIRequest from "./APIRequest";
import CurrentAccessor from "./../../frontend/src/shared/CurrentAccessor";

export default class CreateDataset extends APIRequest {
    constructor() {
        super("Creates a Dataset.",
            "Creates a blank Dataset and returns the DataSetId.",
            {
                "time": "The time that the dataset is created, and that offsets should count from.",
                "description": "A description of what the data is for."
            });
    }

    async getResponse(data) {
        const currentDataSaver = CurrentAccessor.getDataSaver();

        let amount = await currentDataSaver.getDatasetCount();

        return {
            datasetId: amount + ""
        };
    }
}