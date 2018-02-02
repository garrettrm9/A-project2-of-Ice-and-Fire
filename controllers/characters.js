const router = require("express").Router();
const charactersModel = require("../models/characters.js");
const auth = require("../services/auth");

router.get("/", (res, req, next) => {
  req.redirect("/characters/search");
});

// There's few enough trains that we could just
// get them all from the API, but sometimes that's not feasible.
// If the api had a massive number of items in it and used a serach
// feature to find particular elements, for example.
// To show how to do that, we're going to set up a system where we render
// a page with an empty list which we then populate dynamically client-side
// with calls back to the server.
router.get("/search", auth.restrict, (req, res, next) => {
  res.render("characters");
});

router.get("/:characterName", auth.restrict, charactersModel.findByName, (req, res, next) => {
  console.log('In get at characters/:characterName, res.locals.characterData:', res.locals.characterData);
  // res.render("character", res.locals.characterData);
  res.send("YO")
});

module.exports = router;
