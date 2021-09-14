function setAssociations(sequelize) {
    const {movie, rating, review, user} = sequelize.models;

    rating.belongsTo(user, {as: 'Owner'});
    review.belongsTo(user,{as: 'Owner'});
    movie.hasMany(rating, {as: 'Movie'});
    movie.hasMany(review, {as: 'Film'});
    
}

module.exports = {setAssociations};