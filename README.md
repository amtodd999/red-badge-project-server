# **Izutu:**

Welcome fans of all things horror. Izutu is a site in which users can create a list of horror movies to watch and then post a review after they have watched them. This is the server side of a PERN stack full CRUD application. The client side of the project can be found [here](https://github.com/amtodd999/red-badge-client).

## **Deployed Project:**

The final version deployed to heroku can be found at [https://izutu-amt.herokuapp.com/](https://izutu-amt.herokuapp.com/)

## **Project Requirements:**

It was created using Node.js and an Express.js framework and utilizes Postgres as the database management system. This site was completed during a Web Development bootcamp at Eleven Fifty Academy. Requirements included:

- User authentication and registration using a POST method
- This app includes Films and Reviews both successfully create via POST, retrieve via GET, update via PUT, and delete via DELETE method.
- Utilizes a middleware function to protect specific routes
  - Block requests without a token in the authorization header
  - Conditional statements
- Role Based Access Control
- Associates two models to one another and references associations in the controllers
