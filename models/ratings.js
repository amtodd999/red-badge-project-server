const { DataTypes, Sequelize } = require("sequelize");
const { MovieModel, UserModel } = require(".");
const db = require("../db");
const User = require("./user");

const MovieRatings = db.define("rating", {
    MovieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
})






module.exports = MovieRatings;