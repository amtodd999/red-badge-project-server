const { DataTypes, Sequelize } = require("sequelize");
const { MovieModel, UserModel } = require(".");
const db = require("../db");
const User = require("./user");

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