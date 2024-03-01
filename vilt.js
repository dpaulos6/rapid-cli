import { exec } from 'child_process';
import { createPromptModule } from 'inquirer';
import fs from 'fs/promises';
import path from 'path';

async function main() {
  const answers = await createPromptModule()([
    {
      type: 'confirm',
      name: 'initializeVite',
      message: 'Do you want to initialize a new Vite project?',
      default: true
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter the name for your Vite project:',
      default: 'my-vite-project',
      when: answers => answers.initializeVite
    },
    {
      type: 'confirm',
      name: 'installTailwind',
      message: 'Do you want to install Tailwind CSS?',
      default: true
    },
    {
      type: 'confirm',
      name: 'installPrettier',
      message: 'Do you want to install Prettier?',
      default: true
    }
  ]);

  try {
    if (answers.initializeVite) {
      const projectPath = answers.projectName;
      console.log(`Initializing Vite...`);
      await initializeViteProject(projectPath);
      console.log('Vite project initialized successfully.');

      process.chdir(projectPath);
      console.log(`Changed directory to ${projectPath}.`);

      if (answers.installTailwind) {
        console.log('Installing Tailwind CSS...');
        await installTailwind();
        console.log('Tailwind CSS installed successfully.');

        await createTailwindConfig();
        await addTailwindDirectives();
      }

      if (answers.installPrettier) {
        console.log('Installing Prettier...');
        await installPrettier();
        console.log('Prettier installed successfully.');

        await createPrettierConfig();
        await runPrettier();
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function initializeViteProject(projectPath) {
  await runCommand(`npm create vite@latest ${projectPath}`);
}

async function installTailwind() {
  await runCommand('pnpm install -D tailwindcss@latest postcss@latest autoprefixer@latest');
}

async function installPrettier() {
  await runCommand('pnpm install -D prettier');
}

async function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      console.log(stdout);
      console.error(stderr);
      resolve();
    });
  });
}

async function createTailwindConfig() {
  const configContent = `
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: ["./src/**/*.{html,js}"],
      theme: {
        extend: {},
      },
      plugins: [],
    }
  `;

  await fs.writeFile(path.join(process.cwd(), 'tailwind.config.js'), configContent.trim());
  console.log('Tailwind CSS configuration file created successfully.');
}

async function addTailwindDirectives() {
  const cssFilePath = path.join(process.cwd(), 'src', 'App.css');

  try {
    let cssContent = await fs.readFile(cssFilePath, 'utf-8');

    cssContent = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n${cssContent}`;

    await fs.writeFile(cssFilePath, cssContent);
    console.log('Tailwind CSS directives added to CSS file successfully.');
  } catch (error) {
    console.error('Error adding Tailwind CSS directives:', error.message);
  }
}

async function createPrettierConfig() {
  const configContent = `
    {
      "semi": false,
      "tabWidth": 2,
      "printWidth": 100
    }
  `;

  await fs.writeFile(path.join(process.cwd(), '.prettierrc'), configContent.trim());
  console.log('Prettier configuration file created successfully.');
}

async function runPrettier() {
  await runCommand('pnpm exec prettier . --write');
}

main();
