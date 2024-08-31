const express = require("express");
const {
  register,
  login,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controller/user.contoller");
const authenticate = require("../middleware/auh.middleware");
const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.get("/", authenticate, getAllUsers);
userRoute.patch("/edit/:id", authenticate, updateUser);
userRoute.delete("/delete/:id", authenticate, deleteUser);

module.exports = userRoute;
