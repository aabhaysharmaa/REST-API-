import express from "express";
import { deleteUserById, getUserById, getUsers } from "../DB/User.model.ts";
export const getAllUsers = async (req: express.Request, res: express.Response) => {
	try {
		const users = await getUsers();
		if (!users || users.length === 0) return res.status(400).json({ message: "No user Exists in DB" })
		res.status(200).json(users)
	} catch (error) {
		console.log(error.messsage);
		return res.sendStatus(400);
	}
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;
		const user = await deleteUserById(id)
		if (!user) return res.status(400).json({ message: "No user exists" })
		res.status(200).json({ message: "User is deleted succesfully" });
	} catch (error) {
		console.log(error.message);
		return res.sendStatus(200)
	}
}

export const updateUser = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params
		if (!id) return res.status(400).json({ message: "Only user can update this route" })
		const { username, email } = req.body;
		if (!username || !email) {
			return res.sendStatus(400)
		}
		const user = await getUserById(id);
		user.username = username;
		user.email = email;
		await user.save();
		return res.status(200).json({ message: "User updated sucessfully" })
	} catch (error) {
		console.log(error)
	}
}

