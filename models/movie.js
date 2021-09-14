const { DataTypes } = require("sequelize")
const db = require("../db");

const Movie = db.define("movie", {
    TmdbId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: true
    },
    MovieTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Overview: {
        type: DataTypes.STRING
    },
    ReleaseDt: {
        type: DataTypes.DATE
    },
    OrigLang: {
        type: DataTypes.STRING
    },
    Subgenre: {
        type: DataTypes.STRING
    }
})

module.exports = Movie;