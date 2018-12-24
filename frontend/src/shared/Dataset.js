import Datapoint, { StandardDataTypes } from "./Datapoint";
import CurrentAccessor from "./CurrentAccessor";

export default class Dataset {
    constructor(id, time, dataPoints, description) {
        this.lastDatapointId = -1;
        this.id = id;
        this.dataPoints = dataPoints;
        this.time = time;
        this.description = description;
    }
    
    addDatapoint(deltaTime, time, value) {
        let id = this.getNextDatapointId();
        
        this.dataPoints[deltaTime] = new Datapoint(id, deltaTime, value, StandardDataTypes.GENERAL);
    }
    
    addBuiltDatapoint(dataPoint) {
        this.dataPoints[dataPoint.deltaTime] = dataPoint;
    }
    
    pushChangedToDatabase() {
        if(CurrentAccessor.isServer()) {
            // Save to the mongo class
        }
    }
    
    getNextDatapointId() {
        if(this.lastDatapointId !== -1) {
            return ++this.lastDatapointId;
        }

        // this.lastDatapointId = CurrentAccessor.getDataSaver().getLastDatapointId();

        // TODO: load from database
        return 1;
    }
}