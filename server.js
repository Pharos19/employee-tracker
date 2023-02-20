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

const viewRoles = () => {
    db.query("SELECT roles.id AS Dept_Id, roles.title AS Title FROM roles", (err, res) => {
        if (err) {
            console.log(err)
        } else {
            console.table(res)
        }
    manageCompany()
    })
}

const viewEmpByDept = () => {
    db.query("SELECT employees.first_name AS First_Name, employees.last_name AS Last_Name, department.name AS Department FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN department ON roles.department_id = department.id ORDER BY department.id", (err, res) => {
        if (err) {
            console.log(err)
        } else {
            console.table(res)
        }
    manageCompany()
    })
}

const viewEmpByRole = () => {
    db.query("SELECT employees.first_name AS First_Name, employees.last_name AS Last_Name, roles.title AS Title FROM employees INNER JOIN roles ON employees.role_id = roles.id ORDER BY roles.id", (err, res) => {
        if (err) {
            console.log(err)
        } else {
            console.table(res)
        }
    manageCompany()
    })
}


let roleArr = []
const selectRole = () => {
    db.query("SELECT * FROM roles", (err, res) => {
        if (err) {
            console.log(err)
        } else {
            for (var i = 0; i < res.length; i++) {
                roleArr.push(res[i].title)
            }
        }
    })
    return roleArr
}

let employeeArr = []
const selectEmployee = () => {
    db.query("SELECT last_name FROM employees", (err, res) => {
        if (err) {
            console.log(err)
        } else {
            for (var i = 0; i < res.length; i++) {
                employeeArr.push(res[i].last_name)
            }
            
        }
    })
    return employeeArr
}

let managersArr = []
const selectManager = () => {
    db.query("SELECT first_name, last_name FROM employees", (err, res) => {
        if (err) {
            console.log(err)
        } else {
            for (var i = 0; i < res.length; i++) {
                managersArr.push(res[i].first_name)
            }
        }
    })
    return managersArr
}

let deptArr = []
const selectDepartment = () => {
    db.query("SELECT * FROM department", (err, res) => {
        if (err) {
            console.log(err)
        } else {
            for (var i = 0; i < res.length; i++) {
                deptArr.push(res[i].name)
            }
        }
    })
    return deptArr
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name"
        },
        {
            type: "input",
            message: "What is the role of this employee?",
            name: "role",
            Choices: selectRole()
        },
        {
            type: "input",
            message: "Who is the manager of this employee?",
            name: "manager",
            Choices: selectManager()
        }
    ]).then(answer => {
        const role_id = selectRole().indexOf(answer.role) + 1
        const manager_id = selectManager().indexOf(answer.manager) + 1
        db.query("INSERT INTO employees SET ?", 
}