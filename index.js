const cTable = require('console.table');
const inquirer = require('inquirer')

const {
    executeQuery
} = require('./dbconnect')
// const getRandomId = function () { return Math.floor(Math.random() * 100000) }

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'name of new department'

        }
    ])
        .then(async answers => {
            console.log(answers)
            const query = `INSERT INTO department (name) VALUES ("${answers.newDepartment}")`
            const result = await executeQuery(query)
            console.log(result)
            menu()
        })



}
function addRole() {
    inquirer.prompt([

        {
            type: 'input',
            name: 'addName',
            message: 'What is the roles title?'

        },
        {
            type: 'input',
            name: 'addSalary',
            message: 'What is your roles salary?'

        },
        {
            type: 'input',
            name: 'addDepartment',
            message: 'What is your roles department id?'

        }
    ])
        .then(async answers => {
            console.log(answers)
            const query = `INSERT INTO role (title, salary, department_id) VALUES ("${answers.addName}", "${answers.addSalary}", ${answers.addDepartment})`
            const result = await executeQuery(query)
            console.log(result)
            menu()
        })


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
            message: 'What is your role id?'

        },
        {
            type: 'input',
            name: 'addManager',
            message: 'What is your manager id?'

        }
    ])
        .then(async answers => {
            console.log(answers)
            const query = `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ("${answers.addFirstName}", "${answers.addLastName}", ${answers.addRole}, ${answers.addManager})`
            const result = await executeQuery(query)
            console.log(result)
            menu()
        })


}
async function viewRoles() {
    const query = "SELECT * FROM role;"
    const results = await executeQuery(query)
    console.table(results)
    menu()
}
async function viewEmployees() {
    const query = "SELECT * FROM employee;"
    const results = await executeQuery(query)
    console.table(results)
    menu()
}

async function viewDepartment() {
    const query = "SELECT * FROM department;"
    const results = await executeQuery(query)
    console.table(results)
    menu()
}

async function viewAll() {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    const results = await executeQuery(query)
    console.table(results)
    menu()
}

function menu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Chose one of the following options',
            choices: [
                'view all',
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee role',
            ]
        }
    ]).then(async answer => {
        console.log(answer)
        if (answer.menu === 'view all') {
            viewAll()
        }
        else if (answer.menu === 'add a department') {
            addDepartment()
        } else if (answer.menu === 'add a role') {
            addRole()
        } else if (answer.menu === 'add an employee') {
            addEmployee()
        } else if (answer.menu === 'view all roles') {
            viewRoles()
        } else if (answer.menu === 'view all employees') {
            viewEmployees()
        } else if (answer.menu === 'view all departments') {
            viewDepartment()
        }
        else if (answer.menu === 'view all departments') {
            const query = "SELECT * FROM department"
            const departments = await executeQuery(query)


            console.table(
                departments
            );
        }
    }
    )
}
menu()