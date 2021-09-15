require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");


const controllers = require('./controllers');

app.use(Express.json());

app.use("/movie", controllers.movieController);
app.use("/User", controllers.userController);
app.use("/rating", controllers.ratingsController);
app.use("/review", controllers.reviewsController);

app.use(require("./middleware/validate-jwt"));

dbConnection.authenticate()
.then(() => dbConnection.sync())    //{force: true} to reset db
.then(() => {
    app.listen(3000, () => {
        console.log(`[Server]: App is listening on 3000`)
    });
})
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error= ${err}`);
    });

