const {Router} = require("express");
const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
let validateIsAdmin = require("../middleware/validateIsAdmin");

const {RatingsModel, UserModel} = require("../models");
const User = require("../models/user");

//Create new rating
router.post("/add", validateJWT, async (req, res) => {
    const {MovieId, Rating} = req.body.rating;
    const id = req.User.id;
    
    const movieRating = {
        MovieId,
        Rating
    }
    try {
        const findUser = await UserModel.findOne({
            where: {id: id}
        })
        if (findUser) {
            const newRating = await RatingsModel.create(movieRating);
            await newRating.setUser(findUser)
            res.status(200).json(newRating);
        } else {
            res.status(401).json({ Message: "Can't create rating, user does not exist" })
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
});

//Get user's movie rating
router.get("/myRatings", validateJWT, (async (req, res) => {
    const id = req.User.id;
    try {
        const userRatings = await RatingsModel.findAll({
            where: {
                userId: id
            }
        }); 
        // const userRatings = await RatingsModel.findAll({
            
        //     include: [{
        //         model: User,
        //         attributes: ['id']
        //     }]
        // })
        console.log(userRatings) 
        res.status(200).json(userRatings);
    } catch (err) {
        res.status(500).json({error: err});
    }
}));

//Get all ratings
router.get("/allRatings", validateJWT, validateIsAdmin, (async (req, res) => {
    console.log(validateIsAdmin())
    await RatingsModel.findAll().then(ratings => {
        res.json(ratings)
    })
    .catch(err => res.status(500).json({error: err}))
}))

//Update a rating
router.put("/update/:ratingToUpdate", validateJWT, async (req, res) => {
    const {MovieId, Rating} = req.body.rating;
    const ratingId = req.params.ratingToUpdate;
    const id = req.User.id;

    const query = {
        where: {
            id: ratingId,
            Owner: id
        }
    };

    const updatedRating = {
        MovieId: MovieId,
        Rating: Rating,
        Owner: id
    };
    try {
        const update = await RatingsModel.update(updatedRating, query);
        res.status(200).json(update);
    } catch(err) {
        res.status(500).json({error: err});
    }
});

//Delete user's own rating
router.delete("/delete/:ratingToDelete", validateJWT, async (req, res) => {
    const id = req.User.id
    const ratingId = req.params.ratingToDelete;

    try {
        const query = {
            where: {
                id: ratingId,
                Owner: id
            }
        };

        await RatingsModel.destroy(query);
        res.status(200).json({message: "Your rating has been deleted"});
    } catch (err) {
        res.status(500).json({error: err});
    }
})

module.exports = router;
