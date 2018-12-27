import DataSaver from "./../frontend/src/shared/DataSaver";

import { MongoClient } from "mongodb";
import logger from "./logger";

const mongoURL = "mongodb://localhost:27017";
const dbName = "TopazData";

let currentInstance = null;

// This class uses MongoDB. A clone class could be created that
// could use different database frameworks based on project.
export default class ServerDataSaver extends DataSaver {
    constructor(completedCallback) {
        super();

        currentInstance = this;

        MongoClient.connect(mongoURL, (err, mClient) => {
            if(err !== null) {
                logger.log("Error Connecting to MongoDB:");
                logger.log(err);

                completedCallback(false);

                return;
            }

            logger.log("Connected to MongoDB!");

            currentInstance.client = mClient;
            currentInstance.db = mClient.db(dbName);
            currentInstance.datasetCollection = currentInstance.db.collection("datasets");

            completedCallback(true);
        });
    }

    async saveDataset(dataset) {
        const exists = await this.datasetExists(dataset.id);

        if(exists) {
            await this.updateDataset(dataset);

            return;
        }

        this.datasetCollection.insertOne(dataset, (err, res) => {
            if(err) throw err;

            logger.log("Inserted dataset " + dataset.id + ".");

            Promise.resolve();
        });
    }

    async updateDataset(dataset) {
        const exists = await this.datasetExists(dataset.id);

        if(!exists) {
            await this.saveDataset(dataset); // Doesn't exist, save it.

            return;
        }

        // Update it
        this.datasetCollection.updateOne({id: dataset.id}, {$set: dataset}, (err, res) => {
            if(err) throw err;

            logger.log("Updated dataset " + dataset.id + ".");

            Promise.resolve();
        });
    }

    async datasetExists(id) {
        return await this.getDataset(id) !== null;
    }

    async getDataset(id) {
        return await this.datasetCollection.findOne({id: id});
    }

    async getDatasetCount() {
        return await this.datasetCollection.countDocuments();
    }
}