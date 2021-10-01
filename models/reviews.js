const { DataTypes } = require("sequelize");
const db = require("../db");

const MovieReviews = db.define("review", {
    
    MovieTitle: {
        type: DataTypes.STRING(800),
        allowNull: false,
    },
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