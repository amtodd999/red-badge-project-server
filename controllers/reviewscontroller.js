const {Router} = require("express");
const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
let validateIsAdmin = require("../middleware/validateIsAdmin");

const {ReviewsModel, UserModel} = require("../models");

//Create new review
router.post("/add", validateJWT, async (req, res) =>{
    const {MovieId, Review} = req.body.review;
    const id = req.User.id;

    const movieReview = {
        MovieId,
        Review
    }
    try {
        const newReview = await ReviewsModel.create(movieReview);
        const findUser = await UserModel.findOne({
            where: {id: id}
        })
        await findUser.setReview(newReview)
        res.status(200).json(newReview);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

//Get user's movie review
router.get("/myReviews", validateJWT, (async (req, res) => {
    const id = req.User.id;
    try {
        const userReviews = await ReviewsModel.findAll({
            where: {
                userId: id
            }
        }); console.log(userReviews) 
        res.status(200).json(userReviews);
    } catch (err) {
        res.status(500).json({error: err});
    }
}));

//Get all reviews
router.get("/allReviews", validateJWT, validateIsAdmin, (async (req, res) => {
    await ReviewsModel.findAll().then(reviews => {
        res.json(reviews)
    })
    .catch((err) => res.status(500).json({error: err}))
}))

//Update a review
router.put("/update/:reviewToUpdate", validateJWT, async (req, res) => {
    const {MovieId, Review} = req.body.rating;
    const reviewId = req.params.reviewToUpdate;
    const id = req.User.id;

    const query = {
        where: {
            id: reviewId,
            Owner: id
        }
    };

    const updatedReview = {
        MovieId: MovieId,
        Review: Review,
        Owner: id
    };
    try {
        const update = await ReviewsModel.update(updatedReview, query);
        res.status(200).json(update);
    } catch(err) {
        res.status(500).json({error: err});
    }
});

//Delete user's own review
router.delete("/delete/:reviewToDelete", validateJWT, async (req, res) => {
    const id = req.User.id
    const reviewId = req.params.reviewToDelete;

    try {
        const query = {
            where: {
                id: reviewId,
                Owner: id
            }
        };

        await ReviewsModel.destroy(query);
        res.status(200).json({message: "Your review has been deleted"});
    } catch (err) {
        res.status(500).json({error: err});
    }
})

//Delete any user review
router.delete("/adminDelete/:reviewToDelete", validateJWT, validateIsAdmin, async (req, res) => {
    const reviewId = req.params.reviewToDelete;
    try {
        const query = {
            where: {
                id: reviewId
            }
        };

        await ReviewsModel.destroy(query);
        res.status(200).json({message: "This review has been deleted"});
    } catch (err) {
        res.status(500).json({error: err});
    }
})
module.exports = router;