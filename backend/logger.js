import fs from "fs";

let LOGGING_ENABLED = false;

export default class Logger {
    static log(content) {
        console.log(content);

        if(!LOGGING_ENABLED) {
            return;
        }

        fs.appendFile("logs/log.txt", content + "\n", err => {
            if (err) throw err;
        });
    }
}