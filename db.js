const Sequelize = require('sequelize');
//local db url
//const sequelize = new Sequelize(process.env.DATABASE_URL);

//heroku db url
const sequelize = new Sequelize(process.env.DATABASE_URL || `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/amt-first-izutu-server`, {
    dialect: `postgres`,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

module.exports = sequelize;



// const sequelize = new Sequelize(process.env.DB_URL, {
//     dialect: `postgres`,
//ssl: process.env.ENVIRONMENT === `production`
// })

// const sequelize = new Sequelize(process.env.DB_URL, {
//     dialect: ‘postgres’,
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     }
// })