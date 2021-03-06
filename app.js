require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

app.use(require('./middleware/headers'));
const controllers = require('./controllers');

app.use(Express.json());


// app.use("/movie", controllers.movieController);
app.use("/User", controllers.userController);
app.use("/film", controllers.filmsController);
app.use("/review", controllers.reviewsController);

app.use(require("./middleware/validate-jwt"));

dbConnection.authenticate()
.then(() => dbConnection.sync())    //{force: true} to reset db
.then(() => {
    //local port info
    // app.listen(3000, () => {
    //     console.log(`[Server]: App is listening on 3000`)
    // });
    //heroku port info
    app.listen(process.env.PORT, () => {
        console.log(`[Server]: App is listening on ${process.env.PORT}`)
    });
})
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error= ${err}`);
    });

