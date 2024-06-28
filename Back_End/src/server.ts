import mongoose from "mongoose";
import { app } from "./app";
import environment from "./environment";
import { env } from "./utility/env";
const mongoURI = env.MONGODB_URI;
const PORT = environment.getPort();

const CONNECTION_URL: string = mongoURI + environment.getDBName();
// mongoose.set("strictPopulate", false);
const DB = async () => {
  try {
    await mongoose.connect(CONNECTION_URL);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`server is online at http://localhost:${PORT} `);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default DB();
