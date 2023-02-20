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
    } else if (response === 'View all employees by department') {
        viewEmpByDept()
    } else if (response === 'View all employees by role') {
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

const viewEmployees = () => {
    db.query(`SELECT employees.first_name AS First_Name,
    employees.last_name AS Last_Name,
    roles.title AS Role, department.name AS Dept,
    roles.salary AS Salary,
    CONCAT(e.first_name, ' ' ,e.last_name) AS Manager
      FROM employees
        INNER JOIN roles ON employees.role_id = roles.id
        INNER JOIN department ON roles.department_id = department.id
        LEFT JOIN employees e ON employees.manager_id = e.id`, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.table(res)
            }
        manageCompany()
        })
}

const viewDept = () => {
    db.query("SELECT department.id AS Id, department.name AS Department FROM department", (err, res) => {
        if (err) {
            console.log(err)
        } else {
            console.table(res)
        }
        manageCompany()
    })
}