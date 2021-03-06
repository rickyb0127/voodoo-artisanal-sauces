const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const router = express.Router();

const UserSchema = new Schema({
  name: String,
  password: String
});

const User = mongoose.model('User', UserSchema);

const dbRoute = "mongodb://admin:pass123@ds049104.mlab.com:49104/voodoo-artisanal-sauces";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//GET
router.get("/", (req, res) => {
  User.find({}, function (error, Users) {
    if (error) {
      console.error(error);
    } else {
      res.send({
        Users
      });
    }
  });
});

//POST
router.post("/", (req, res) => {
  console.log(req.body.name);
  var new_User = new User({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    photo: req.body.photo
  });

  new_User.save(function (error) {
    if (error) {
      console.log(error);
    } else {
      res.send({
        success: true,
        message: "User saved successfully"
      });
    }
  });
});

//DELETE
router.delete("/:id", (req, res) => {
  User.deleteOne({
    _id: req.params.id
  }, function (error, user) {
    if (error) {
      res.send(error)
    } else {
      res.send({
        success: true
      });
    }
  });
});

module.exports = router;