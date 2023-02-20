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
            
        }
    ])
}