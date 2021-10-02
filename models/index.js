const UserModel = require("./user");
const MovieModel = require("./movie");
const FilmsModel = require("./films");
const ReviewsModel = require("./reviews");

//Need to figure out how to add cascade so when a user is deleted, all associated data is too
  
    UserModel.hasMany(FilmsModel, {as: 'film'});
    FilmsModel.belongsTo(UserModel);
    FilmsModel.hasMany(ReviewsModel);

    UserModel.hasMany(ReviewsModel, {as: 'review'});
    ReviewsModel.belongsTo(UserModel);
    ReviewsModel.belongsTo(FilmsModel);

module.exports = {
    UserModel,
    MovieModel,
    FilmsModel,
    ReviewsModel
};