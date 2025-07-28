import express from "express";
import { deleteUser, getAllUsers } from "../controllers/users.ts";
import { isAuthenticated, isOwner } from "../middlewares/index.ts"
export default (router: express.Router) => {
	router.get("/users", getAllUsers);
	router.delete("/user/:id", isAuthenticated, isOwner, deleteUser)
}




