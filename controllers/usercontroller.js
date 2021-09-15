const { UniqueConstraintError } = require("sequelize/lib/errors");
const router = require("express").Router();
const { UserModel } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
            console.log(loginUser.password)
            console.log(password)
            console.log("here is the comparison" + passwordComparison)

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

module.exports = router;