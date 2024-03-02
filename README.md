# Rapid CLI

Rapid CLI is a tool to simplify frontend frameworks installation, and save you the trouble of going to the docs of each dependency/lib and running several commands one by one.

The CLI wont change the process of how each option is installed, but it will combine all commonly used technologies in frontend frameworks, within one single command. 

You only have to select your favorite options, Rapid will do the rest.

## Development

Please follow the instructions carefully to ensure everything works when you try to run the CLI locally.

### 1. Clone the repository

Using **Git**

```
git clone https://github.com/dpaulos6/rapid-cli.git
```

Using **GitHub CLI**

```
gh repo clone dpaulos6/rapid-cli
```

Alternatively you can download the source code and unzip it into a folder of choice.

### 2. Install dependencies

This step is mandatory!! You need to install the libraries on your local copy of the repository to prevent missing modules or files.

```bash
npm install
```

### 3. Build the project

This CLI uses TypeScript and `nodejs` doesn't support it, so in order to actually test the CLI, you need to build the project to compile into JavaScript. The compiled files will be created inside `dist`.

```bash
npm run build
```

### 4. Test the CLI

This is the last step, and if you followed everything correctly, you should be able to run the CLI with no issues. 

```bash
npm run start
```

If you followed everything correctly and you encounter errors while testing the CLI, please create an issue and provide as much information as you can, as well as the steps to reproduce this errors.
