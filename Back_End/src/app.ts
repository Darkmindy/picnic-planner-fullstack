import cors from "cors";
import express from "express";
import {
	router as logInApi,
	router as logOutApi,
	router as signUpApi,
} from "./routes/user.route";

export const app = express();
app.use(express.urlencoded({ extended: true }));

// Configura CORS
app.use(
	cors({
		origin: "http://localhost:5173", // Indica l'origine permessa
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specifica i metodi permessi
		credentials: true, // Indica se sono permessi i cookie
	})
);

app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "Server is online" });
});

app.use("/", signUpApi);
app.use("/", logInApi);
app.use("/", logOutApi);
