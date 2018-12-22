/* global io */

let instance = null;

export default class ClientSocketManager {
    constructor() {
        this.socket = io("http://localhost:8081");
    }

    static getInstance(){
        return instance;
    }

    static getSocket() {
        return instance.socket;
    }
}

let createClient = () => {
    instance = new ClientSocketManager();
};

export { createClient };