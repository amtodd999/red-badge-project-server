const {DataTypes, STRING} = require("sequelize");
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
    role: {
        type: STRING,
        defaultValue: 'basic',
        enum: ["basic", "admin"]
    }
});

module.exports = User;