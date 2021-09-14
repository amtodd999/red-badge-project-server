const UserModel = require("./user");
const MovieModel = require("./movie");
const RatingsModel = require("./ratings");
const ReviewsModel = require("./reviews");

    
    MovieModel.hasMany(RatingsModel, {as: 'Movie'});
    // RatingsModel.belongsTo(UserModel, {as: 'Owner'});
    
    MovieModel.hasMany(ReviewsModel,{as: 'Film'});
    ReviewsModel.belongsTo(UserModel,{as: 'Owner'});
    
    UserModel.hasMany(RatingsModel, {as: 'Rating'});
    UserModel.hasMany(ReviewsModel, {as: 'Review'});

module.exports = {
    UserModel,
    MovieModel,
    RatingsModel,
    ReviewsModel
};