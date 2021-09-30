const { UniqueConstraintError } = require("sequelize/lib/errors");
const router = require("express").Router();
const { UserModel } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateJWT = require("../middleware/validate-jwt");
const validateIsAdmin = require("../middleware/validateIsAdmin");


//Create new user
router.post("/register", async (req, res) => {

    const { email, password, isAdmin } = req.body.User;

    try {
        const User = await UserModel.create({
            email,
            password: bcrypt.hashSync(password, 13),
            isAdmin
        });

        let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

        res.status(201).json({
            User,
            sessionToken: token,
            message: "user is registered",
            sessionToken: token
        });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            });
        } else {
            res.status(500).json({
                message: "Failed to create user",
            });
        }
    }
})

//Update a user as admin
router.put("/update/:userToUpdate", validateJWT, validateIsAdmin, (async (req,res) => {
    const {isAdmin} = req.body.User;
    const userId = req.params.userToUpdate;
    const id = req.params.userToUpdate;
    const query = {
        where: {
            id: userId
        }
    } 
    const updatedUser = {
        
        isAdmin: isAdmin
    };
    try {
        const update = await UserModel.update(updatedUser, query)
        res.status(200).json(update);
    } catch(err) {
        res.status(500).json({error: err});
    }
}))

//Get all users ADMIN
router.get("/allusers", validateJWT, validateIsAdmin, (async (req, res) => {
    await UserModel.findAll().then(users => {
        res.json(users)
    })
    .catch(err => res.status(500).json({error: err}))
}))


//User login
router.post("/login", async (req, res) => {
    let { email, password } = req.body.User;

    try {
        const loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
        });
        if (loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password);
            if (passwordComparison) {
                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

                res.status(200).json({ 
                    User: loginUser,
                    message: "logged in",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "incorrect email or password"
                })
            }
        } else {
            res.status(401).json({
                message: "incorrect email or password2"
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'failed to log in'
        })
        
    }

});

//Delete user ADMIN
router.delete("/adminDelete/:userToDelete", validateJWT, validateIsAdmin, async (req, res) => {
    const deleteId = req.params.userToDelete;
    try {
        const query = {
            where: {
                id: deleteId
            }
        };

        await UserModel.destroy(query);
        res.status(200).json({ message: "This user has been deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;