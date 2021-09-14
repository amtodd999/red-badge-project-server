const { DataTypes, Sequelize } = require("sequelize");
const { MovieModel, UserModel } = require(".");
const db = require("../db");
const User = require("./user");

const MovieRatings = db.define("rating", {
    MovieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    // Owner: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    Rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
})

// MovieRatings.associate = (models) => {
//     MovieRatings.belongsTo(models.user, {
//         foreignKey: "id", as: "ownerId"
//     })
// }
//MovieRatings.belongsTo(User, {as: 'User', foreignKey: 'id'})




module.exports = MovieRatings;