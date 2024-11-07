// IMPORT SECTION
require('dotenv').config()
// const configuration = require('config')
const Sequelize = require('sequelize')

// 1) Sequelize Configuration
// const database = configuration.get("database.name")
const database = process.env.DATABASE_NAME
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const options = {
    /* One of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    dialect: 'mysql',
    // host: 'ec2-3-15-140-165.us-east-2.compute.amazonaws.com',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Set to true in production with valid certificates
        },
    },
    pool: {
        max: 20,
        min: 0,
        acquire: 60000,
        idle: 10000
    }
}

/* console.log("Database name: ", database)
console.log("Database host: ", username)
console.log("Database password: ", password)
console.log("Database options: ", options) */

module.exports.sequelize = new Sequelize(database, username, password, options)
