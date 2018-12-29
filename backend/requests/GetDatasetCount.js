import APIRequest from "./APIRequest";
import CurrentAccessor from "../../frontend/src/shared/CurrentAccessor";

export default class GetDatasetCount extends APIRequest {
    constructor() {
        super("Gets highest dataset count",
            "Counts the number of datasets and returns the value.",
            {});
    }

    async getResponse() {
        return {
            count: await CurrentAccessor.getDataSaver().getDatasetCount()
        };
    }
}