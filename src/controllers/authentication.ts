import express from "express";
import { createUser, getUserByEmail, getUserBySessionToken } from "../DB/User.model.ts";
import { authentication, random } from "../helpers/index.ts";
export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password, username } = req.body;
		if (!email || !password || !username) return res.sendStatus(400).json({ success: false, message: "feilds are not defined" });
		const existingUser = await getUserByEmail(email);
		if (existingUser) return res.sendStatus(409).json({ message: "User Already exits" });
		const salt = random();
		const user = await createUser({
			username,
			email,
			authentication: {
				salt,
				password: authentication(salt, password)
			}
		})
		// user.authentication = undefined;
		res.status(200).json(user).end();
	} catch (error) {
		console.log(error.message)
		return res.sendStatus(400).json({ success: false, message: error.message })
	}
};

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) res.status(400).json({ message: "please provide the valid credentials" });
		const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");
		if (!user) return res.status(400)
		const expectedHash = authentication(user.authentication.salt, password)
		if (user.authentication.password !== expectedHash) return res.sendStatus(400).json({ message: "please provide the valid password" })
		const salt = random();
		user.authentication.sessionToken = authentication(salt, user._id.toString());
		user.save();
		res.cookie("ABHAY", user.authentication.sessionToken, { domain: "localhost", path: "/" });
		return res.status(200).json({ success: true, message: "User Login successfully" });
	} catch (error) {
		console.log(error.message);
		res.sendStatus(400).json({ message: error.message });
	}
};
export const logout = async (req: express.Request, res: express.Response) => {
	try {
		const sessionToken = req.cookies["ABHAY"];
		if (!sessionToken) return res.status(400).json({ message: "No token" })
		const user = await getUserBySessionToken(sessionToken);
		user.authentication.sessionToken = undefined;
		await user.save()
		res.clearCookie("ABHAY");
		res.status(200).json({ message: "User LogOut succesfully" })
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ message: error.message || "Internal Server Error" })
	}
};
