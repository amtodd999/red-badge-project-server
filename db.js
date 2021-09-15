const Sequelize = require('sequelize');
const sequelize = new Sequelize("postgres://postgres:KristynaBV!80!@localhost:5432/izutu");

// async function syncDb(sequelize, force = false){
//     try {
//         if (force)
//             await sequelize.sync({force: true})
//         else
//             await sequelize.sync()
//     } catch (err){
//         console.log(err)
//     }
// }

// module.exports = {sequelize, syncDb};
module.exports = sequelize;