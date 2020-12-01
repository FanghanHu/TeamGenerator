const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

let employees = [];
let usedIds = [];

function promptQuestions() {
    inquirer.prompt([
        {
            name: 'choice',
            type: "list",
            message: "What type of team member would you like to add?",
            choices:['manager', 'engineer', 'intern', "No more"],
        }
    ]).then(response => {

        // noinspection JSUnusedGlobalSymbols
        let questions = [
            {
                type: 'input',
                name: 'name',
                message: "What is this teammate's name?",
                validate: value => {
                    if(value.match(/[a-zA-Z\d]+/gs)) {
                        return true;
                    } else {
                        return "Please enter an valid name";
                    }
                }
            },
            {
                type: 'input',
                name: 'id',
                message: "What is this teammate's id?",
                validate: input => {
                    if(!usedIds.includes(input)) {
                        if(input > 0) {
                            return true;
                        } else {
                            return "Id must be a number that is greater than 0";
                        }
                    } else {
                        return "Id has already been used";
                    }
                }
            },
            {
                type: 'input',
                name: 'email',
                message: "What is this teammate's email?",
                validate: value => {
                    if(value.match(/[a-zA-Z\d]+@[a-z|\d]+\.[a-z|\d]+/gs)) {
                        return true;
                    } else {
                        return "Please enter an valid email";
                    }
                }
            }
        ];

        // noinspection JSUnresolvedVariable
        switch (response.choice) {
            case 'manager':
                questions.push({
                    type: 'input',
                    name: 'officeNumber',
                    message: "What is this teammate's office number?",
                    validate: value => {
                        if(value.match(/\d+/gs)) {
                            return true;
                        } else {
                            return "Please enter an valid phone number(numbers only, no dash)";
                        }
                    }
                },);
                break;
            case 'engineer':
                questions.push({
                    type: 'input',
                    name: 'github',
                    message: "What is this teammate's github?",
                    validate: value => {
                        if(value.match(/[a-zA-Z\d]+/gs)) {
                            return true;
                        } else {
                            return "Please enter an valid username";
                        }
                    }
                },);
                break;
            case 'intern':
                questions.push({
                    type: 'input',
                    name: 'school',
                    message: "What is this teammate's school?",
                    validate: value => {
                        if(value.match(/[a-zA-Z\d]+/gs)) {
                            return true;
                        } else {
                            return "Please enter an valid school name";
                        }
                    }
                },);
                break;
            case "No more":
                //render into html.
                let html = render(employees);
                //check if folder exists, create new folder if it doesn't exist
                if(!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);
                //write html into file, log error if error exists
                fs.writeFile(outputPath, html, err => err?console.error(err):"");

                //break from recursive loop.
                return;
        }

        inquirer.prompt(questions).then(answers => {
            let {name, id, email} = answers;
            let commonFields = [name, id, email];
            usedIds.push(id);
            // noinspection JSUnresolvedVariable
            switch (response.choice) {
                case 'manager':
                    employees.push(new Manager(...commonFields, answers.officeNumber));
                    break;
                case 'engineer':
                    employees.push(new Engineer(...commonFields, answers.github));
                    break;
                case 'intern':
                    employees.push(new Intern(...commonFields, answers.school));
                    break;
            }
            promptQuestions();
        })
    });
}


promptQuestions();
