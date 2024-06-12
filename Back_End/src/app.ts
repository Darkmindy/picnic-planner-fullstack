import express from "express";
import { router as logInApi, router as signUpApi } from "./routes/user.route";

export const app = express();

//configure the middleware for body requests
//app.use(express.urlencoded({ extended: false })); // this middleware is used to analyse the http requests with url-encoded payload
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "Server is online" });
});

app.use("/user", signUpApi);
app.use("/user", logInApi);

// export default app;
