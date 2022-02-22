const cTable = require('console.table');
const inquirer = require('inquirer')

const {
    executeQuery
} = require('./dbconnect')
const getRandomId = function () { return Math.floor(Math.random() * 100000) }

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
        .then(async answers => {
            console.log(answers)
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
        .then(async answers => {
            console.log(answers)
            const id = getRandomId()
            const query = `INSERT INTO employee (id,first_name,last_name,role_id,manager_id) VALUES (${id}, "${answers.addFirstName}", "${answers.addLastName}", ${answers.addRole}, ${answers.addManager})`
            const result = await executeQuery(query)
            console.log(result)

        })


}
async function viewRoles() {
    const query = "SELECT * FROM role LEFT JOIN department ON role.department_id = department.id"
    const results = await executeQuery(query)
    console.table(results)
}
async function viewEmployees(){
    const query = "SELECT * FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id"
    const results = await executeQuery(query)
    console.table(results)
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
                'add an employee',
                'update an employee role',
            ]
        }
    ]).then(async answer => {
        console.log(answer)
        if (answer.menu === 'add a department') {
            addDepartment()
        } else if (answer.menu === 'add a role') {
            addRole()
        } else if (answer.menu === 'add an employee') {
            addEmployee()
        } else if (answer.menu === 'view all roles') {
            viewRoles()
        } else if (answer.menu === 'view all employees') {
            viewEmployees()
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