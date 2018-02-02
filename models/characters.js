const db = require("../db/index.js");
const axios = require("axios");

const charactersModel = {};

      // To simulate an API with search, we'll filter for just those trains that
      // meet the criteria specified in our req.query data.
      // This is some magic we haven't covered yet called
      // "regular expressions". They are useful for
      // figuring out if strings are, for example, numbers
      // or letters. It isn't important for us to understand
      // them right now, because if we were working with a real
      // search API it would be taking care of filtering our
      // results for us.      
charactersModel.allCharacters = (req, res, next) => {
  console.log("in charactersModel.allCharacters. req.query:", req.query);
  axios({
    url: "https://anapioficeandfire.com/api/characters",
    method: "get"
  })
    .then(response => {
      const rawData = response.data;
      const filteredData = rawData.filter(datum => {
        if (req.query.letter && /[a-zA-Z]/.test(datum.name)) {
          return true;
        } else if (req.query.numeric && /[0-9]+/.test(datum.name)) {
          return true;
        }
        return false;
      });
      res.locals.allCharactersData = filteredData;
      next();
    })
    .catch(err => {
      console.log(
        "error encountered in charactersModel.allCharacters axios call, error:",
        err
      );
      next(err);
    });
};

// // this is used in the '/users/trains' get route in controllers/users.js
// charactersModel.findByUser = (req, res, next) => {
//   console.log("in charactersModel.findByUser, req.user:", req.user);
//   db
//     .manyOrNone("SELECT * FROM comments WHERE user_id = $1;", [req.user.id])
//     .then(result => {
//       res.locals.userCharacterData = result;
//       next();
//     })
//     .catch(err => {
//       console.log(
//         "error encountered in charactersModel.findByUser, error:",
//         err
//       );
//       next(err);
//     });
// };

// this is used in the 'trains/:trainName' route in controllers/trains.js
charactersModel.findByName = (req, res, next) => {
  const characterName = req.params.characterName;
  axios({
    url:`https://anapioficeandfire.com/api/characters?name=${characterName}`,
    method: 'get'
  })
    .then(response => {
      res.locals.characterData = response.data;
      next();
    })
    .catch (err => {
      console.log(
        "error encountered in charactersModel.getByName, error:",
        err
      );
      next(err);
    });
};



// // used in the '/users/trains/:trainName/edit' GET method in controllers/users.js
// charactersModel.findByUserAndName = (req, res, next) => {
//   const characterName = req.params.characterName;
//   const userId = req.user.id;
//   db
//     .one("SELECT * FROM comments WHERE user_id = $1 AND character_name = $2", [
//       userId,
//       characterName
//     ])
//     .then(result => {
//       res.locals.characterData = result;
//       next();
//     })
//     .catch(err => {
//       console.log(
//         "Error encountered in charactersModel.findByUserAndName, error:",
//         err
//       );
//       next(err);
//     });
// };

// // this is used in the 'users/trains' POST route in controllers/users.js
charactersModel.addUserCharacter = (req, res, next) => {
  console.log("----------------------");
  console.log("in charactersModel.addUserCharacter. req.body:", req.body);
  const userId = req.user.id;
  const characterName = req.body.characterName;
  const comment = req.body.comment;
  db
    .one(
      "INSERT INTO comments (user_id, character_name, comment) VALUES ($1, $2, $3) RETURNING id;",
      [userId, characterName, comment]
    )
    .then(result => {
      res.locals.characterCommentId = result.id;
      next();
    })
    .catch(err => {
      console.log(
        "Error encountered in charactersModel.addUserCharacter. error:",
        err
      );
      next(err);
    });
};

// // this gets used in the '/users/trains/:trainName' PUT method in controllers/users.js
// charactersModel.updateCharacter = (req, res, next) => {
//   console.log("------------------------");
//   console.log("in charactersModel.updateCharacter. req.body:", req.body);
//   const userId = req.user.id;
//   // we get the trainName from a different place than addUserTrain in this method
//   const characterName = req.params.characterName;
//   const comment = req.body.comment;
//   db
//     .one(
//       "UPDATE comments SET comment = $1 WHERE user_id = $2 AND character_name = $3 RETURNING id;",
//       [comment, userId, characterName]
//     )
//     .then(data => {
//       res.locals.editedCharacterId = data.id;
//       next();
//     })
//     .catch(err => {
//       console.log(
//         "Error encountered in charactersModel.updateCharacter. error:",
//         err
//       );
//       next(err);
//     });
// };

charactersModel.destroy = (req, res, next) => {
  console.log("--------------------------");
  console.log("In charactersModel.destroyByUserAndName.");
  const userId = req.user.id;
  const characterName = req.params.characterName;
  db
    .none("DELETE FROM comments WHERE user_id = $1 AND character_name = $2", [
      userId,
      characterName
    ])
    .then(() => {
      next();
    })
    .catch(err => {
      console.log(
        "Error encountered in charactersModel.destroy. error:",
        err
      );
      next(err);
    });
};

module.exports = charactersModel;