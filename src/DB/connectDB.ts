import mongoose from "mongoose";

const connectDB = async () => {
	try {
		if (!process.env.MONGODB_URL) {
			console.error("MONGODB_URL is empty or not defined")
		}
		const conn = await mongoose.connect(process.env.MONGODB_URL);
		console.log(`MONGODB was connect ${conn.connection.host}`)
	} catch (error) {
		console.log(error.message);
		throw new Error(error.message);
	}
}

export default connectDB;