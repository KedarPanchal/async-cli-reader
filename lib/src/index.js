"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIReader = void 0;
const readline = __importStar(require("readline"));
class CLIReader {
    reader;
    question;
    constructor(readStream, writeStream) {
        this.reader = readline.createInterface({
            input: readStream ?? process.stdin,
            output: writeStream ?? process.stdout,
        });
        this.question = require("util").promisify(this.reader.question).bind(this.reader);
    }
    async nextLine(prompt) {
        try {
            const output = await this.question(prompt ?? "");
            this.reader.close();
            return output;
        }
        catch {
            throw ("Could not read input.");
        }
    }
    async nextNumber(prompt) {
        let output;
        await this.nextLine(prompt).then((answer) => {
            output = Number(answer);
        }).catch((error) => {
            throw (error);
        });
        this.reader.close();
        if (output) {
            return output;
        }
        else {
            throw (`Could not parse ${output} as a number`);
        }
    }
    async nextBoolean(prompt) {
        let output;
        await this.nextLine(prompt).then((answer) => {
            if (answer.toLowerCase() === "true") {
                output = true;
            }
            else if (answer.toLowerCase() === "false") {
                output = false;
            }
        }).catch((error) => {
            throw (error);
        });
        if (output) {
            return output;
        }
        else {
            throw (`Could not parse ${output} as a boolean`);
        }
    }
}
exports.CLIReader = CLIReader;
let reader = new CLIReader();
reader.nextNumber().then((answer) => {
    console.log(answer);
}).catch((error) => {
    console.log("Ooops");
});
