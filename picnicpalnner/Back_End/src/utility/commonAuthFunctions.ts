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

// Create token
export const createToken = (id: string) => {
  const accessSecret = env.ACCESS_SECRET_TOKEN;
  const refreshSecret = env.REFRESH_SECRET_TOKEN;

  if (!accessSecret || !refreshSecret) {
    throw new Error(
      "Missing environment variables ACCESS_SECRET_TOKEN or REFRESH_SECRET_TOKEN"
    );
  }

  const accessToken = jwt.sign({ id }, accessSecret, { expiresIn: "1s" });
  const refreshToken = jwt.sign({ id }, refreshSecret, { expiresIn: "20m" });

  return { accessToken, refreshToken };
};
