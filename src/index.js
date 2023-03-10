#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import shell from "shelljs";
import * as template from "./utils/template.js";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CHOICES = fs.readdirSync(`${__dirname}/templates`);
console.log(CHOICES);
const QUESTIONS = [
  {
    name: `template`,
    type: "list",
    message: "What project template would like to generate? ",
    choices: CHOICES,
  },
  {
    name: "name",
    type: "input",
    message: "Project name:",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
];

const CURR_DIR = process.cwd();

function createProject(projectPath) {
  if (fs.existsSync(projectPath)) {
    console.log(
      chalk.red(`Folder ${projectPath} exists. Delete or use another name.`)
    );
    return false;
  }
  fs.mkdirSync(projectPath);
  return true;
}
const SKIP_FILES = ["node_modules", ".template.json", "target", ".env"];

function createDirectoryContents(templatePath, projectName) {
  const filesToCreate = fs.readdirSync(templatePath);
  filesToCreate.forEach((file) => {
    const origFilePath = path.join(templatePath, file);

    const stats = fs.statSync(origFilePath);
    if (SKIP_FILES.indexOf(file) > -1) return;
    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, "utf-8");
      contents = template.render(contents, { projectName });
      const writePath = path.join(CURR_DIR, projectName, file);
      fs.writeFileSync(writePath, contents, "utf-8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(CURR_DIR, projectName, file));
      createDirectoryContents(
        path.join(templatePath, file),
        path.join(projectName, file)
      );
    }
  });
}

inquirer.prompt(QUESTIONS).then((answers) => {
  const projectChoice = answers["template"];
  const projectName = answers["name"];
  const templatePath = path.join(__dirname, "templates", projectChoice);
  const targetPath = path.join(CURR_DIR, projectName);
  const options = {
    projectName,
    templateName: projectChoice,
    templatePath,
    targetPath,
  };
  console.log(options);
  if (!createProject(targetPath)) {
    return;
  }
  createDirectoryContents(templatePath, projectName);
  postProcess(options);
});

function postProcess(options) {
  const isNode = fs.existsSync(path.join(options.templatePath, "package.json"));
  if (isNode) {
    console.log(chalk.green("Installing Dependencies \n"));
    shell.cd(options.targetPath);
    const result = shell.exec("npm install");
    if (result.code !== 0) {
      return false;
    }
    console.log(chalk.green(`cd ${options.projectName}`));
    console.log(chalk.green(`npm start \n`));
    console.log(chalk.green(`Thank You! \n`));
  }
  return true;
}
