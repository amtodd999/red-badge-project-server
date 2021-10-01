const { DataTypes, Sequelize } = require("sequelize");
const db = require("../db");

const films = db.define("film", {
    FilmTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Overview: {
        type: DataTypes.STRING,
        allowNull: true,
    }
    
})

// Moviefilms.associate = (models) => {
//     Moviefilms.belongsTo(models.user, {
//         foreignKey: "id", as: "ownerId"
//     })
// }
//Moviefilms.belongsTo(User, {as: 'User', foreignKey: 'id'})




module.exports = films;