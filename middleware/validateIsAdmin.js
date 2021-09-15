const { UserModel } = require("../models");

const validateIsAdmin = async(req, res, next) => {
    const { isAdmin } = req.User
    console.log(isAdmin)
    if(isAdmin === false) {
        res.status(400).send({ message: "You are not an admin" });
    } else {
        next();
    }
}

module.exports = validateIsAdmin;