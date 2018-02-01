const router = require("express").Router();
const trainsModel = require("../../models/characters.js");

router.get('/', charactersModel.allCharacters, (req, res, next) => {  
  res.json(res.locals.allCharactersData);
});

module.exports = router;