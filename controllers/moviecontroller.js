const Express = require("express");
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const { MovieModel } = require("../models");


/*
CREATE MOVIE ENTRY
*/
router.post("/create", validateJWT, async (req, res) => {
    const {TmdbId, MovieTitle, Overview, ReleaseDt, OrigLanguage, Subgenre} = req.body.movie
    const {id} = req.User.id;
    const movieEntry = {
        TmdbId,
        MovieTitle,
        Overview,
        ReleaseDt,
        OrigLanguage,
        Subgenre
    }
    try {
        const newMovie = await MovieModel.create(movieEntry);
        res.status(200).json(newMovie);
    } catch (err) {
        res.status(500).json({error: err});
    }
})

/*GET ALL MOVIES*/
router.get("/", async (req, res) => {
    try {
        const allMovies = await MovieModel.findAll();
        res.status(200).json(allMovies);
    } catch (err) {
        res.status(500).json({error: err});
    }
})

/*GET MOVIES BY TITLE */
router.get("/:title", async (req, res) => {
    const { title } = req.params;
    try {
        const results = await MovieModel.findAll({
            where: {MovieTitle: title}
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({error: err});
    }
})

/*GET USER'S MOVIE WATCHLIST */
router.get('/watchlist', validateJWT, async (req, res) => {
    const {id} = req.User;
    try {
        const userWatchlist = await MovieModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userWatchlist);
    } catch (err) {
        res.status(500).json({error: err});
    }
});


module.exports = router;