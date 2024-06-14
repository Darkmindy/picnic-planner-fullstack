import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "./env";

// Hash password
export async function hashStuff(password: string | undefined): Promise<string> {
	if (!password) {
		throw new Error("password undefined");
	}
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}

// Create access token --> for now it's never expired
export const createAccessToken = (id: string /*time: string*/) => {
	const secret = env.ACCESS_SECRET_TOKEN;
	if (!secret) {
		throw new Error("Missing environment variable JWT_SECRET");
	}
	return jwt.sign({ id }, secret /*{ expiresIn: time }*/);
};
