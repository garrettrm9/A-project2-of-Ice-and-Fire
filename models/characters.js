const db = require("../db/index.js");
const axios = require("axios");

const charactersModel = {};

charactersModel.findByUser = (req, res, next) => {
  console.log('in charactersModel.findByUser, req.user:', req.user);
  db
    .manyOrNone("SELECT * FROM comments WHERE  user_id = $1;", [req.user.id])
    .then(result => {
      res.locals.userCharacterData = result;
      next();
    })
    .catch(err => {
      console.log(
        "error encountered in charactersModel.findByUser, error",
        err
      );
      next(err);  
    });
};




// // this is used in the 'trains/:trainName' route in controllers/trains.js
// trainsModel.findByName = (req, res, next) => {
//   const trainName = req.params.trainName;
//   axios({
//     url: `http://www.mtastat.us/api/trains/${trainName}`,
//     method: "get"
//   })
//     .then(response => {
//       res.locals.trainData = response.data;
//       next();
//     })
//     .catch(err => {
//       console.log(
//         "error encountered in trainsModel.getByName, error:",
//         err
//       );
//       next(err);
//     });
// };

// // used in the '/users/trains/:trainName/edit' GET method in controllers/users.js
// trainsModel.findByUserAndName = (req, res, next) => {
//   const trainName = req.params.trainName;
//   const userId = req.user.id;
//   db
//     .one("SELECT * FROM comments WHERE user_id = $1 AND train_name = $2", [
//       userId,
//       trainName
//     ])
//     .then(result => {
//       res.locals.trainData = result;
//       next();
//     })
//     .catch(err => {
//       console.log(
//         "Error encountered in trainsModel.findByUserAndName, error:",
//         err
//       );
//       next(err);
//     });
// };

// // this is used in the 'users/trains' POST route in controllers/users.js
// trainsModel.addUserTrain = (req, res, next) => {
//   console.log("----------------------");
//   console.log("in trainsModel.addUserTrain. req.body:", req.body);
//   const userId = req.user.id;
//   const trainName = req.body.trainName;
//   const comment = req.body.comment;
//   db
//     .one(
//       "INSERT INTO comments (user_id, train_name, comment) VALUES ($1, $2, $3) RETURNING id;",
//       [userId, trainName, comment]
//     )
//     .then(result => {
//       res.locals.trainCommentId = result.id;
//       next();
//     })
//     .catch(err => {
//       console.log(
//         "Error encountered in trainsModel.addUserTrain. error:",
//         err
//       );
//       next(err);
//     });
// };

// // this gets used in the '/users/trains/:trainName' PUT method in controllers/users.js
// trainsModel.updateTrain = (req, res, next) => {
//   console.log("------------------------");
//   console.log("in trainsModel.updateTrain. req.body:", req.body);
//   const userId = req.user.id;
//   // we get the trainName from a different place than addUserTrain in this method
//   const trainName = req.params.trainName;
//   const comment = req.body.comment;
//   db
//     .one(
//       "UPDATE comments SET comment = $1 WHERE user_id = $2 AND train_name = $3 RETURNING id;",
//       [comment, userId, trainName]
//     )
//     .then(data => {
//       res.locals.editedTrainId = data.id;
//       next();
//     })
//     .catch(err => {
//       console.log(
//         "Error encountered in trainsModel.updateTrain. error:",
//         err
//       );
//       next(err);
//     });
// };

// trainsModel.destroy = (req, res, next) => {
//   console.log("--------------------------");
//   console.log("In trainsModel.destroyByUserAndName.");
//   const userId = req.user.id;
//   const trainName = req.params.trainName;
//   db
//     .none("DELETE FROM comments WHERE user_id = $1 AND train_name = $2", [
//       userId,
//       trainName
//     ])
//     .then(() => {
//       next();
//     })
//     .catch(err => {
//       console.log(
//         "Error encountered in trainsModel.destroy. error:",
//         err
//       );
//       next(err);
//     });
// };

// module.exports = trainsModel;
