import { Command } from 'commander';
const program = new Command();

program.version('1.0.0');

program
  .command('greet <name>')
  .description('Greet a user')
  .option('-t, --title <title>', 'Title for the greeting')
  .action((name, options) => {
    const title = options.title ? options.title : 'Hello';
    console.log(`${title}, ${name}!`);
  });

program.parse(process.argv);
