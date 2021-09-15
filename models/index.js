// const {sequelize, syncDb} = require ('../db');
// const { DataTypes} = require('sequelize');
const UserModel = require("./user");
const MovieModel = require("./movie");
const RatingsModel = require("./ratings");
const ReviewsModel = require("./reviews");

// const DefineUser = require('./user');
// const DefineRating = require('./ratings');

// const User = DefineUser(sequelize, DataTypes)
// const Rating = DefineRating(sequelize, DataTypes)

// User.hasMany(Rating)
// Rating.belongsTo(User)

// syncDb(sequelize, true)

// module.exports = { User, Rating};


    
    // MovieModel.hasMany(RatingsModel, {as: 'Movie'});
    // RatingsModel.belongsTo(UserModel, {as: 'Owner'});
    
    // MovieModel.hasMany(ReviewsModel,{as: 'Film'});
    // ReviewsModel.belongsTo(UserModel,{as: 'Owner'});
    
    UserModel.hasMany(RatingsModel, {as: 'User'});
    RatingsModel.belongsTo(UserModel);

    UserModel.hasMany(ReviewsModel, {as: 'Review'});

module.exports = {
    UserModel,
    MovieModel,
    RatingsModel,
    ReviewsModel
};