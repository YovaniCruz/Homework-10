const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const addManager = () => {

  console.log("Enter Manager's info.")

    inquirer
      .prompt([
          {
            type: "input",
            name: "name",
            message: "What's the Manager's name?"
          },
          {
            type: "input",
            name: "email",
            message: "What's the Manager's email?"
          },
          {
            type: "input",
            name: "officeNumber",
            message: "What is the Manager's office number?"
          }
      ]).then(res => {

        const manager = new Manager(res.name, res.id, res.email, res.officeNumber);
        employees.push(manager);

        console.log(`${res.name} has been added!`);

        addToTeam();

      }) 
};

const addToTeam = () => {
    inquirer
      .prompt([
          {
              type: "list",
              name: "add2team",
              message: "Do we need anyone else?",
              choices: ["Engineer", "Intern", "No. We're all set."]
          }
      ]).then(answers => {
          switch (answers.add2team) {
            case "Engineer": {
                addEngineer();
                break;
            }
            case "Intern": {
                addIntern();
                break;
            }
            default:
                console.log("Thanks for entering the info");
                console.log(employees);
              
                fs.writeFile(outputPath, render(employees), function(err) {
                  if (err) throw err;
                })

                break;
          }
      })
}

const addEngineer = () => {
    inquirer
      .prompt([
          {
            type: "input",
            name: "name",
            message: "What's the Engineer's name?"
          },
          {
            type: "input",
            name: "email",
            message: "What's the Engineer's email?"
          },
          {
            type: "input",
            name: "id",
            message: "What about their employee ID# ?"
          },
      ]).then(res => {

        const engineer = new Engineer(res.name, res.id, res.email,);
        employees.push(engineer);

        console.log(`${res.name} has been added!`);

        addToTeam();

      });
};

const addIntern = () => {
    inquirer
      .prompt([
          {
            type: "input",
            name: "name",
            message: "What's the Intern's name?"
          },
          {
            type: "input",
            name: "email",
            message: "What's the Intern's email?"
          },
          {
            type: "input",
            name: "id",
            message: "What about their employee ID# ?"
          },
          {
            type: "input",
            name: "school",
            message: "Where does the Intern currently study?"
          }
      ]).then(res => {

        const intern = new Intern(res.name, res.id, res.email, res.school);
        employees.push(intern);

        console.log(`${res.name} has been added!`);

        addToTeam();

      });
};

module.exports = employees;

addManager();