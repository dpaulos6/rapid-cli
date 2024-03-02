import { createPromptModule } from "inquirer";
import { exec } from "child_process";
import data from "./data.json" assert { type: "json" };
// Extract the options from the imported JSON data
const frameworksPromptList = data.frameworks;
// Define npm commands for each framework
const npmCommands = {
    React: "npx create-next-app@latest",
    Vue: "npm create vue@latest",
    Svelte: "npm create svelte@latest",
    Preact: "npm init preact",
    Solid: "npx degit solidjs/templates/js",
    Astro: "npm create astro@latest",
    Next: "npx create-next-app@latest",
    Nuxt: "npx nuxi@latest init",
    Remix: "npx create-remix@latest",
    Vite: "npm create vite@latest"
};
// Create a list prompt using inquirer
const prompt = createPromptModule();
// Define the question collection
const questions = [
    {
        type: "list",
        name: "frameworkOption",
        message: "Select a framework:",
        choices: frameworksPromptList
    }
];
// Display the list of options and get user's choice
prompt(questions)
    .then((answers) => {
    const selectedFramework = answers.frameworkOption;
    // const npmCommand = npmCommands[selectedFramework];
    const npmCommand = "npm --version";
    // Execute the npm command
    exec(npmCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error}`);
            return;
        }
        console.log(`Command executed successfully: ${npmCommand}`);
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
})
    .catch((error) => {
    console.error(error);
});
