const User = require('../models/user');
const router = require('express').Router();
const passport = require('passport');

const charactersModel = require('../models/characters')

const auth = require('../services/auth');

// users index

router.get('/', (req, res, next) => {
    res.redirect('/login')
});

router.post(
    '/', passport.authenticate(
        "local-signup",
        {
            failureRedirect: '/login',
            successRedirect: '/profile'
        }
    )
);

// new user

router.get("/profile", (req, res) => {
    res.render("profile");
});

// logout

router.get("/logout", (req, res) => {
    // passport put this method on req for us
    req.logout();
    // redirect back to index page
    res.redirect("/");
});

// user login

router.get("/profile", (req, res) => {
    res.render("/profile");
});

//middleware 

router.post(
    "/login",
    passport.authenticate("local-login", {
        failureRedirect: "/login",
        successRedirect: "/profile"
    })
);

// user profile

router.get(
    "/profile",
    // Middleware (that we wrote) ensuring that if the user is not
    // authenticated, he or she will be redirected to the login screen.
    auth.restrict,
    User.findByEmailMiddleware,
    (req, res) => {
        console.log("in handler for /profile");
        console.log("req.user:");
        console.log(req.user);
        res.render("/profile", { user: res.locals.userData });
    }
);

// router.post(
//     "/counter",
//     auth.restrict,
//     User.incrementUserCounter,
//     (req, res) => {
//         console.log("in post at /counter, req.user: ", req.user);
//         res.json(res.locals.counterData);
//     }
// );

// ========================================
// NEW
// user trains!

// router.get(
//     "/trains",
//     auth.restrict,
//     trainsModel.findByUser,
//     (req, res, next) => {
//         console.log("in GET at /users/trains. res.locals:", res.locals);
//         res.render("users/trains", { userTrainData: res.locals.userTrainData });
//     }
// );

router.post(
    "/profile",
    auth.restrict,
    charactersModel.addUserCharacter,
    (req, res, next) => {
        console.log("in post at /profile. res.locals:", res.locals);
        res.json({ characterCommentId: res.locals.characterCommentId });
    }
);

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

// this route gets hit from the form at /users/trains/:trainName/edit
// (the route just above this one)
// router.put(
//     "/trains/:trainName",
//     auth.restrict,
//     trainsModel.updateTrain,
//     (req, res, next) => {
//         res.send({ editedTrainId: res.locals.editedTrainId });
//     }
// );

// triggered from the Delete button at the /users/trains URL
// (see views/users/trains.html and script.js)
router.delete(
    "/characters/:characterName",
    auth.restrict,
    charactersModel.destroy,
    (req, res, next) => {
        res.json({});
    }
);

module.exports = router;