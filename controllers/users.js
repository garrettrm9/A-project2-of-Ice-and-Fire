const User = require('../models/user');
const router = require('express').Router();
const passport = require('passport');

const characterModel = require('../models/characters')

const auth = require('../services/auth');

// ----------------------------------------
// users index

router.get('/', (req, res, next) => {
    res.send('here we go')
});


// // ----------------------------------------
// // users index

// router.post(
//     "/",
//     // we want the behavior of the site to vary depending on whether or
//     // not the user is already logged in. If they are logged in, we want
//     // to send them to /users/profile. If they are not, we want to send
//     // them to users/new.
//     passport.authenticate(
//         // The following string indicates the particular strategy instance
//         // we'll want to use to handle signup. We defined behavior for
//         // 'local-signup' back in index.js.
//         "local-signup",
//         {
//             failureRedirect: "/users/new",
//             successRedirect: "/users/profile"
//         }
//     )
// );

// // ----------------------------------------
// // register new user

// router.get("/new", (req, res) => {
//     res.render("users/new");
// });

// // ----------------------------------------
// // user logout

// router.get("/logout", (req, res) => {
//     // passport put this method on req for us
//     req.logout();
//     // redirect back to index page
//     res.redirect("/");
// });

// // ----------------------------------------
// // user login

// router.get("/login", (req, res) => {
//     res.render("users/login");
// });

// // passport.authenticate will _build_ middleware for us
// // based on the 'local-login' strategy we registered with
// // passport in auth.js
// router.post(
//     "/login",
//     passport.authenticate("local-login", {
//         failureRedirect: "/users/login",
//         successRedirect: "/users/profile"
//     })
// );

// // ----------------------------------------
// // user profile

// router.get(
//     "/profile",
//     // Middleware (that we wrote) ensuring that if the user is not
//     // authenticated, he or she will be redirected to the login screen.
//     auth.restrict,
//     User.findByEmailMiddleware,
//     (req, res) => {
//         console.log("in handler for users/profile");
//         console.log("req.user:");
//         console.log(req.user);
//         res.render("users/profile", { user: res.locals.userData });
//     }
// );

// router.post(
//     "/counter",
//     auth.restrict,
//     User.incrementUserCounter,
//     (req, res) => {
//         console.log("in post at /counter, req.user: ", req.user);
//         res.json(res.locals.counterData);
//     }
// );

// // ========================================
// // NEW
// // user trains!

// router.get(
//     "/trains",
//     auth.restrict,
//     trainsModel.findByUser,
//     (req, res, next) => {
//         console.log("in GET at /users/trains. res.locals:", res.locals);
//         res.render("users/trains", { userTrainData: res.locals.userTrainData });
//     }
// );

// router.post(
//     "/trains",
//     auth.restrict,
//     trainsModel.addUserTrain,
//     (req, res, next) => {
//         console.log("in post at /users/trains. res.locals:", res.locals);
//         res.json({ trainCommentId: res.locals.trainCommentId });
//     }
// );

// router.get(
//     "/trains/:trainName/edit",
//     auth.restrict,
//     trainsModel.findByUserAndName,
//     (req, res, next) => {
//         const trainData = res.locals.trainData;
//         console.log('trainData:', trainData);
//         res.render("users/editTrain.html", trainData);
//     }
// );

// // this route gets hit from the form at /users/trains/:trainName/edit
// // (the route just above this one)
// router.put(
//     "/trains/:trainName",
//     auth.restrict,
//     trainsModel.updateTrain,
//     (req, res, next) => {
//         res.send({ editedTrainId: res.locals.editedTrainId });
//     }
// );

// // triggered from the Delete button at the /users/trains URL
// // (see views/users/trains.html and script.js)
// router.delete(
//     "/trains/:trainName",
//     auth.restrict,
//     trainsModel.destroy,
//     (req, res, next) => {
//         // not a lot to send back
//         res.json({});
//     }
// );

module.exports = router;