/* eslint-disable react-in-jsx-scope */

let isServer = false;
let dataSaver = null;

// Wrapper class
export default class CurrentAccessor {
    static setIsServer(newVal) {
        isServer = newVal;
    }
    
    static setDataSaver(newVal) {
        dataSaver = newVal;
    }
    
    static getDataSaver() {
        return dataSaver;
    }
    
    static isServer() {
        return isServer;
    }
}