import fs from "fs";
import directoryExists from "directory-exists";

let LOGGING_ENABLED = true;

export default class Logger {
    static log(content) {
        console.log(content);

        if(!LOGGING_ENABLED) {
            return;
        }

        if(!directoryExists.sync("./logs")) {
            // Create the directory & file
            fs.mkdirSync("./logs");
            fs.closeSync(fs.openSync("logs/log.txt", "w"));

            console.log("Created new log file.");
        }

        if(typeof content !== "string") {
            content = JSON.stringify(content);
        }

        fs.appendFile("logs/log.txt", content + "\n", err => {
            if (err) throw err;
        });
    }
}