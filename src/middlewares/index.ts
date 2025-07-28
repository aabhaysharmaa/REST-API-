import express from "express";
import lodash from 'lodash';
const { get, merge } = lodash;
import { getUserBySessionToken } from "../DB/User.model.ts";
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const sessiontoken = req.cookies["ABHAY"];
		if (!sessiontoken) return res.status(403).json({ message: "User is not authenticated" });
		const existingUser = await getUserBySessionToken(sessiontoken);
		if (!existingUser) return res.status(403).json({ message: "user is not authenticated" })
		merge(req, { identity: existingUser });
		return next();
	} catch (error) {
		console.log(error.message);
		return res.status(400);
	}
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const { id } = req.params;
		const currentUserId = get(req, `identity._id`) as string;
		if (!currentUserId) return res.status(400).json({ message: "please provide the ID" });
		if (currentUserId.toString() !== id) {
			return res.status(400).json({ message: "Only owner can delete this data" })
		}
		return next();
	} catch (error) {
		console.log(error.message)
		return res.status(400).json({ message: error.message })
	}
}