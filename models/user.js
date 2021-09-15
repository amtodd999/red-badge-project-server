const {DataTypes, STRING} = require("sequelize");
const { UserModel } = require(".");
const dbConnection = require("../db");
const MovieRatings = require("./ratings");

const User = dbConnection.define("user", {
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

// User.associate = (models) => {User.hasMany(MovieRatings)};
// User.associate = (models) => {
//     User.hasMany(models.MovieRatings, {
//         foreignKey: "userId"
//     })
// }

module.exports = User;