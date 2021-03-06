const {DataTypes} = require("sequelize");
const dbConnection = require("../db");

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
    // role: {
    //     type: DataTypes.STRING,
    //     defaultValue: 'Basic',
    //     enum: ["Basic", "Admin"]
    // }
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

// User.associate = (models) => {User.hasMany(Moviefilms)};
// User.associate = (models) => {
//     User.hasMany(models.Moviefilms, {
//         foreignKey: "userId"
//     })
// }

module.exports = User;