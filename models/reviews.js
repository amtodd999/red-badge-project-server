const { DataTypes } = require("sequelize");
const {MovieModel} = require(".");
const db = require("../db");
const User = require("./user");


const MovieReviews = db.define("review", {
    MovieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    // Owner: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    Review: {
        type: DataTypes.STRING(800),
        allowNull: false,
    },
    Flagged: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    }
})

// User.hasMany(MovieReviews);
// MovieReviews.belongsTo(User);

module.exports = MovieReviews;

// MovieReviews.belongsTo(User, {as: 'Owner'});