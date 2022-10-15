import * as readline from "readline";

export class CLIReader {
  private reader: readline.Interface;
  private question: any;
  
  constructor(readStream?: NodeJS.ReadStream, writeStream?: NodeJS.WriteStream) {
    this.reader = readline.createInterface({
      input: readStream ?? process.stdin,
      output: writeStream ?? process.stdout,
    });
    
    this.question = require("util").promisify(this.reader.question).bind(this.reader);
  }
  
  async nextLine(prompt?: string): Promise<string> {  
    try {
      const output: string = await this.question(prompt ?? "");
      this.reader.close();
      return output;
    } catch {
      throw("Could not read input.");
    }
  }

  async nextNumber(prompt?: string): Promise<number> {
    let output: number;
    
    await this.nextLine(prompt).then((answer) => {
      output = Number(answer);
    }).catch((error) => {
      throw(error);
    });
    
    this.reader.close();

    if(output) {
      return output;
    } else {
      throw(`Could not parse ${output} as a number`);
    }
  }

  async nextBoolean(prompt?: string): Promise<boolean> {
    let output: boolean|undefined;

    await this.nextLine(prompt).then((answer) => {
      if(answer.toLowerCase() === "true") {
        output = true;
      } else if(answer.toLowerCase() === "false") {
        output = false;
      }
    }).catch((error) => {
      throw(error);
    });

    if(output) {
      return output;
    } else {
      throw(`Could not parse ${output} as a boolean`);
    }
  }
}
