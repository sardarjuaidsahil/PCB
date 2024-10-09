import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  login,
  register,
  update,
} from "../Controller/AuthController.js";


const authroutes = express.Router();

authroutes.route("/register").post(register);
authroutes.route("/login").post(login);
authroutes.route("/users").get(getAllUsers);
authroutes.route("/users/:id").get(getUserById);
authroutes.route("/users/:id").delete(deleteUser);
authroutes.route("/update").put(update);






export default authroutes;
