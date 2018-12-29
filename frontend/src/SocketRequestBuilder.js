import ClientSocketManager from "./ClientSocketManager";

let requestPool = {};

export default class SocketRequestBuilder {
    static async makeRequest(name, body, additionalHeaders = {}) {
        // Build an object for this request
        additionalHeaders.wantedRequest = name;
        additionalHeaders.body = body;
        additionalHeaders.requestId = SocketRequestBuilder.guid();

        // Send the data and await the response
        ClientSocketManager.getSocket().emit("MakeRequest", additionalHeaders);

        const respondedData = await SocketRequestBuilder.createPromiseHack(additionalHeaders.requestId);

        delete requestPool[additionalHeaders.requestId];

        return respondedData;
    }

    static createPromiseHack(reqId) {
        return new Promise((res, rej) => {
            requestPool[reqId] = res; // Hacky, I know. Fight me.
        });
    }

    static getRequestPool() {
        return requestPool;
    }

    static guid() {
        let s4 = SocketRequestBuilder.s4; // Shorthand

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    static s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
}