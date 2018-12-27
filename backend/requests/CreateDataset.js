import APIRequest from "./APIRequest";
import CurrentAccessor from "./../../frontend/src/shared/CurrentAccessor";
import Dataset from "../../frontend/src/shared/Dataset";

export default class CreateDataset extends APIRequest {
    constructor() {
        super("Creates a Dataset.",
            "Creates a blank Dataset and returns the DataSetId.",
            {
                time: {
                    critical: false,
                    description: "The time that the dataset is created, and that offsets should count from.",
                    fallbackValue: () => {
                        return new Date().getTime()
                    }
                },
                description: {
                    critical: false,
                    description: "A description of what the data is for.",
                    fallbackValue: () => {
                        return "No description was set.";
                    }
                }
            });
    }

    async getResponse(data) {
        const currentDataSaver = CurrentAccessor.getDataSaver();

        let amount = await currentDataSaver.getDatasetCount();
        let dataset = new Dataset(amount, parseInt(data.time), [], data.description);

        await currentDataSaver.saveDataset(dataset);

        return {
            datasetId: amount
        };
    }
}