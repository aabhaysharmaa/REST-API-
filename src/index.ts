import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import router from "./router/index.ts";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./DB/connectDB.ts";
const app = express();
app.use(cors({
	credentials: true,
})); 
app.use(cors({ origin: "http://localhost:8080" }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);


server.listen(8080, () => {
	connectDB();
	console.log(`Server was running on http://localhost:8080/`);
})

app.use("/", router()); // app.use(router())

app.use((err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {
	res.status(500).json({ message: "internal Server Error" });
})