# The async-cli-reader library
### Introduction
The async-cli-reader library is a simple wrapper around the Node JS readline library. This library only has one class: CLIReader.

### The Constructor
The CLIReader class constructor has the following signature:
`constructor(readStream?: NodeJS.ReadStream, writeStream?: NodeJS.WriteStream)`  

The `readStream` parameter is an optional parameter that specifies which readable stream the CLIReader instance should read from. The `process.stdin` stream is used if no stream is provided. 

The `writeStream` parameter is another optional parameter that specifies which stream the CLIReader instance should write to. The `process.stdout` stream is used if no stream is provided.

The line reading functions read from either the `process.stdin` input stream or whatever stream is specified in the class constructor.

### Class Methods
The CLIReader class has three asynchronous methods:
* `nextLine(prompt?: string)` reads the next line of user input and returns a `Promise<string>`. There is an optional prompt parameter, which prints a prompt to the specified output before receiving input. If there is an error and user input cannot be read, the method throws an error message.
* `nextNumber(prompt?: string)` reads the next number of user input and returns a `Promise<number>`. There is an optional prompt parameter, which functions as detailed above. If there is an error in reading the next number, such as the wrong type of input being provided or if the input cannot be read.
* `nextBoolean(prompt?: string)` functions the exact same as `nextNumber`, but returns a `Promise<boolean>` instead. Acceptable inputs are `true` and `false`. These acceptable inputs are case-insensitive.
