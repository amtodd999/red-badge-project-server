const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL || `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/<dbName>`, {
    dialect: `postgres`,
    ssl: process.env.ENVIRONMENT === 'production'
})
// const sequelize = new Sequelize(process.env.DB_URL, {
//     dialect: `postgres`,
//ssl: process.env.ENVIRONMENT === `production`
// })

module.exports = sequelize;