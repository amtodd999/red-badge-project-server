const UserModel = require("./user");
const MovieModel = require("./movie");
const RatingsModel = require("./ratings");
const ReviewsModel = require("./reviews");

    
    UserModel.hasMany(RatingsModel, {as: 'Rating'});
    RatingsModel.belongsTo(UserModel);

    UserModel.hasMany(ReviewsModel, {as: 'Review'});
    ReviewsModel.belongsTo(UserModel);

module.exports = {
    UserModel,
    MovieModel,
    RatingsModel,
    ReviewsModel
};