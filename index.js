const cTable = require('console.table');
const inquirer = require('inquirer')

const {
    executeQuery
} = require('./dbconnect')


function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'name of new department'

        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'department ID'

        }
    ])
        .then(async answers => { console.log(answers) 
        const query = `INSERT INTO department (id, name) VALUES (${answers.departmentId}, "${answers.newDepartment}")`
        const result = await executeQuery(query)
        console.log(result)
        })



}
function addRole() {
    inquirer.prompt([

        {
            type: 'input',
            name: 'addName',
            message: 'What is the roles name?'

        },
        {
            type: 'input',
            name: 'addSalary',
            message: 'What is your roles salary?'

        },
        {
            type: 'input',
            name: 'addDepartment',
            message: 'What is your roles department?'

        }
    ])
        .then(answers => { console.log(answers) })


}
function addEmployee() {
    inquirer.prompt([

        {
            type: 'input',
            name: 'addFirstName',
            message: 'What is the employee first name?'

        },
        {
            type: 'input',
            name: 'addLastName',
            message: 'What is your employee last name?'

        },
        {
            type: 'input',
            name: 'addRole',
            message: 'What is your role?'

        },
        {
            type: 'input',
            name: 'addManager',
            message: 'Who is your manager?'

        }
    ])
        .then(answers => { console.log(answers) })


}

function menu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Chose one of the following options',
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee,',
                'update an employee role',



            ]
        }
    ]).then(async answer => {
        console.log(answer)
        if (answer.menu === 'add a department') {
            addDepartment()
        } else if (answer.menu === 'add a role') {
            addRole()
        } else if (answer.menu === 'add a employee') {
            addEmployee()
        }
        else if (answer.menu === 'view all departments') {
            const query="SELECT * FROM department"
            const departments = await executeQuery(query)
     
            
console.table(
  departments
);
        }
    }
    )
}
menu()