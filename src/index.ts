import { createPromptModule, QuestionCollection } from "inquirer"
import data from "./data.json" assert { type: "json" }
import presets from "./presets.json" assert { type: "json" }
import templates from "./templates.json" assert { type: "json" }

// Extract the options from the imported JSON data
const frameworksPromptList: string[] = data.frameworks
const proceduresPromptList: string[] = data.procedures
const proceduresPresetsPromptList: string[] = presets
const dependenciesPromptList: string[] = data.dependencies

// Create a list prompt using inquirer
const prompt = createPromptModule()

// Define the question collection
const questions: QuestionCollection = [
  {
    type: "list",
    name: "frameworkOption",
    message: "Select a framework:",
    choices: frameworksPromptList
  },
  {
    type: "list",
    name: "procedureOption",
    message: "Select a procedure:",
    choices: proceduresPromptList
  }
]

// Display the list of options
prompt(questions)
  .then((answers) => {
    // Depending on the selected procedure, show a specific list of options
    switch (answers.procedureOption) {
      case "Use a template (Clone a public template)":
        let templateList: string[]
        switch (answers.frameworkOption) {
          case "Astro":
            templateList = templates.astro
            break
          default:
            templateList = templates.default
        }

        // Show a list of template options
        prompt([
          {
            type: "list",
            name: "procedureTemplateOption",
            message: "Select a template:",
            choices: templateList
          }
        ])
        break
      case "Use a preset (Pre-installs a list of dependencies)":
        // Show a list of preset options
        prompt([
          {
            type: "list",
            name: "procedurePresetOption",
            message: "Select a preset:",
            choices: proceduresPresetsPromptList
          }
        ])
        break
      case "Choose manually":
        // Show a list of manual selection options
        prompt([
          {
            type: "list",
            name: "procedureManualOption",
            message: "Select a manual option:",
            choices: dependenciesPromptList
          }
        ])
        break
      default:
        console.log("No specific action for", answers.procedureOption)
    }
  })
  .catch((error) => {
    console.error(error)
  })
