const {Router} = require("express");
const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
let validateIsAdmin = require("../middleware/validateIsAdmin");

const {FilmsModel, UserModel, ReviewsModel} = require("../models");
const User = require("../models/user");

//Create new film
router.post("/add", validateJWT, async (req, res) => {
    const {FilmTitle, Overview} = req.body.film;
    const id = req.User.id;
    
    const filmEntry = {
        FilmTitle,
        Overview
    }
    try {
        const findUser = await UserModel.findOne({
            where: {id: id}
        })
        if (findUser) {
            const newfilm = await FilmsModel.create(filmEntry);
            await newfilm.setUser(findUser)
            res.status(200).json(newfilm);
        } else {
            res.status(401).json({ Message: "Can't create film, user does not exist" })
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
});

//Get user's films
router.get("/myfilms", validateJWT, (async (req, res) => {
    const id = req.User.id;
    try {
        const userfilms = await FilmsModel.findAll({
            where: {
                userId: id
            },
            include: ReviewsModel
        }); 
        console.log(userfilms) 
        res.status(200).json(userfilms);
    } catch (err) {
        res.status(500).json({error: err});
    }
}));

//Get all films
router.get("/allfilms", validateJWT, validateIsAdmin, (async (req, res) => {
    await FilmsModel.findAll().then(films => {
        res.json(films)
    })
    .catch(err => res.status(500).json({error: err}))
}))

//Get film by id
router.get("/:singleFilmId", validateJWT, (async (req, res) => {
    const singleFilmId = req.params.singleFilmId;
    const id = req.User.id;
    try {
        const results = await FilmsModel.findAll({
            where: {
                id: singleFilmId,
                userId: id
            }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({error: err});
    }
}))

//Update a film
router.put("/update/:filmToUpdate", validateJWT, async (req, res) => {
    const {FilmTitle, Overview} = req.body.film;
    const filmId = req.params.filmToUpdate;
    const id = req.User.id;

    const query = {
        where: {
            id: filmId,
            userId: id
        }
    };

    const updatedFilm = {
        FilmTitle: FilmTitle,
        Overview: Overview
    };
    try {
        const update = await FilmsModel.update(updatedFilm, query);
        res.status(200).json(update);
    } catch(err) {
        res.status(500).json({error: err});
    }
});

//Delete user's own film
router.delete("/delete/:filmToDelete", validateJWT, async (req, res) => {
    const id = req.User.id
    const filmId = req.params.filmToDelete;

    try {
        const query = {
            where: {
                id: filmId,
                userId: id
            }
        };

        await FilmsModel.destroy(query);
        res.status(200).json({message: "Your film has been deleted"});
    } catch (err) {
        res.status(500).json({error: err});
    }
})

module.exports = router;
