import dotenv from 'dotenv'
dotenv.config()
import inquirer from 'inquirer'
import consoleTable from 'console.table'
import mysql from 'mysql2'

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_USER,
    database: process.env.DB_NAME
})

const manageCompany = async () => {
    await inquirer.prompt([
        {
            type: "list",
            message: "Select from the options listed:",
            name: "response",
            choice: [
                "View all departments",
                "View all roles",
                "View all employees",
                "View all employees by department",
                "View all employees by role",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "I'm done"
         ]

    }
])
.then(answer => {
    let {response} = answer
    if (response === 'View all departments') {
        viewDept()
    } else if (response === 'View all roles') {
        viewRoles()
    } else if (response === 'View all employees') {
        viewEmployees()
    } else if (response === 'View all employees by department') [
        viewEmpByDept()
    ] else if (response === 'View all employees by role') {
        viewEmpByRole()
    } else if (response === 'Add a department') {
        addDept()
    } else if (response === 'Add a role') {
        addRole()
    } else if (response === 'Add an employee') {
        addEmployee()
    } else if (response === 'Update an employee role') {
        updateEmployee()
    } else if (response === `I'm done`) {
        console.log("Thank you")
        process.exit()
    }
})
.catch(err => console.log(err))

}

