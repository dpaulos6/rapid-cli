import { createPromptModule, QuestionCollection } from "inquirer"

import data from './data.json' assert { type: 'json' };


// Extract the options from the imported JSON data
const frameworksPromptList: string[] = data.frameworks
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
  }
]

// Display the list of options
prompt(questions)
  .then((answers) => {
    console.log(`You selected: ${answers.frameworkOption}`)
    // Perform actions based on the selected option
    switch (answers.frameworkOption) {
      // You can implement actions here based on the selected option
      default:
        console.log("Performing action for", answers.frameworkOption)
    }
  })
  .catch((error) => {
    console.error(error)
  })
