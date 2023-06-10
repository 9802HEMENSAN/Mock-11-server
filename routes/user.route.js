const express = require("express");
const { UserModel } = require("../Model/user.model");
const UserDetails = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

UserDetails.post("/register", async (req, res) => {
  const { email, password, age, name } = req.body;
  try {
    bcrypt.hash(password, 4, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ email, age, name, password: hash });
        await user.save();
        res.status(200).send("user registerd successfully !");
      }
    });
  } catch (error) {
    res.status(401).send(error);
  }
});

UserDetails.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //returns the first document that matches this email
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { authorId: user._id, authorname: user.name },
            "hemensan"
          );
          res.status(200).send({ msg: "login successfuly", token: token });
        } else {
          res.status(401).send("wrong data");
        }
      });
    } else {
      res.send("Wrong credentials");
    }
  } catch (error) {
    res.send(error);
  }
});

UserDetails.get("/", async (req, res) => {
     try {
      const users= await UserModel.find();
      if(users.length){
        res.status(200).send(users);
      }
     } catch (error) {
       res.status(401).send(error);
     }
})

module.exports = {
  UserDetails,
};
