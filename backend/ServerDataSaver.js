import DataSaver from "./../frontend/src/shared/DataSaver";

export default class ServerDataSaver extends DataSaver {
    saveDataset(dataset, callback) {
        callback(true);
    }
}