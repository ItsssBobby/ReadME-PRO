// TODO: Include packages needed for this application

const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
        validate: function (data) {
            if (data) {
                return true;
            } else {
                console.log('Enter the title of your project')
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please enter a brief description of this project',
        validate: function (data) {
            if (data) {
                return true;
            } else {
                console.log('Enter a description for your project')
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'install',
        message: 'How do you install the application?',
        validate: function (data) {
            if (data) {
                return true;
            } else {
                console.log('Please describe how to install the application')
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How do you use this application?',
        validate: function (data) {
            if (data) {
                return true;
            } else {
                console.log('Describe how the application is used.')
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please select a license',
        choices: ['Apache', 'Boost-Software', 'BSD-2-Clause-"Simplified"', 'BSD-3-Clause-"New"-or-"Revised"', 'Creative-Commons-Zero', 'Eclipse-Public', 'GNU-Affero-General-Public', 'GNU-Lesser-General-Public', 'GNU-General-Public', 'MIT', 'Mozilla-Public', 'The-Unlicense', 'No-License']
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
        validate: function (data) {
            if (data) {
                return true;
            } else {
                console.log('Please enter your email address')
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?',
        validate: function (data) {
            if (data) {
                return true;
            } else {
                console.log('Please enter your GitHub username')
                return false;
            }
        }
    }
];

const writeToFile = data => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./README.md', data, err => {
            if (err) {
                reject(console.error(err));
                return;
            }
            resolve(
                console.log('successfully created README!')
            );
        });
    });
};

// When you run node index.js the questions will be asked.
const init = () => {
    return inquirer.prompt(questions)
    .then(readmeData => {
        return readmeData;
    })
};

// Function call to initialize app
init()
.then(readmeData => {
    console.log(readmeData);
    return generateMarkdown(readmeData);
})
.then(pageMD => {
    return writeToFile(pageMD);
})
.catch(err => {
    console.log(err);
})
