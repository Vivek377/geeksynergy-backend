const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const register = async (req, res) => {
  try {
    const { email, password, phone, profession, name } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      res.status(400).send({ err: "User Already Present" });
    } else {
      bcrypt.hash(password, 5, async (err, hashed) => {
        if (err) {
          res.status(400).send({ err: err });
        } else {
          const newUser = new UserModel({
            email,
            password: hashed,
            name,
            phone,
            profession,
          });
          console.log(hashed);

          await newUser.save();
          res.status(200).send({ msg: "user registered successfully" });
        }
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ err: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
          res.status(400).send({ err: "invalid password" });
        } else {
          const token = jwt.sign({ userId: user._id }, "secret");
          res.status(200).send({ msg: "logged in", token: token });
        }
      });
    } else {
      res.status(400).send({ err: "no users found" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ err: e.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
    res.status(400).send({ err: e.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserModel.findByIdAndUpdate({ _id: id }, req.body);

    const users = await UserModel.find({});
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
    res.status(400).send({ err: e.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserModel.findByIdAndDelete({ _id: id }, req.body);

    const users = await UserModel.find({});
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
    res.status(400).send({ err: e.message });
  }
};

module.exports = { register, login, getAllUsers, updateUser, deleteUser };
