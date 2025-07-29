import express from "express";
import { deleteUser, getAllUsers, updateUser } from "../controllers/users.ts";
import { isAuthenticated, isOwner } from "../middlewares/index.ts"
export default (router: express.Router) => {
	router.get("/users", getAllUsers);
	router.delete("/user/:id", isAuthenticated, isOwner, deleteUser)
	router.put("/user/:id", isAuthenticated, isOwner, updateUser)
}




