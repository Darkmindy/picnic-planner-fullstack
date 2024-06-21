import cors from "cors";
import express from "express";
import {
	router as fetchUserApi,
	router as fetchingNewTokenApi,
	router as logInApi,
	router as logOutApi,
	router as signUpApi,
} from "./routes/user.route";

export const app = express();
app.use(express.urlencoded({ extended: true })); // This setting allows parsing of nested objects and arrays within the data

// Configura CORS
app.use(
	cors({
		origin: "http://localhost:5173", // Indica l'origine permessa
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specifica i metodi permessi
		allowedHeaders: ['Content-Type', 'Authorization'], // Indica gli headers permessi
    	exposedHeaders: ['Authorization'], // Indica gli headers che possono apparire sul Front-End
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
app.use("/", fetchUserApi);
app.use("/", fetchingNewTokenApi);
