/// <reference types="node" />
export declare class CLIReader {
    private reader;
    private question;
    constructor(readStream?: NodeJS.ReadStream, writeStream?: NodeJS.WriteStream);
    nextLine(prompt?: string): Promise<string>;
    nextNumber(prompt?: string): Promise<number>;
    nextBoolean(prompt?: string): Promise<boolean>;
}
