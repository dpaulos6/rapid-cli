#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
// Create a new instance of Commander
const program = new commander_1.Command();
// Define the version of your CLI tool
program.version('1.0.0');
// Define a command with options and description
program
    .command('greet <name>')
    .description('Greet a user')
    .option('-t, --title <title>', 'Title for the greeting')
    .action((name, options) => {
    const title = options.title ? options.title : 'Hello';
    console.log(`${title}, ${name}!`);
});
// Parse command line arguments
program.parse(process.argv);
