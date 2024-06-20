import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";
import { env } from "../utility/env";
import { IDecodedToken } from "../validation/decodedToken.interface";
import { IUser } from "../validation/user.interface";

export const createUser = async (user: IUser): Promise<IUser> => {
  return await User.create(user);
};

export const findUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

export const findByEmail = async (
  email: string | undefined
): Promise<IUser | null> => {
  return await User.findOne({ email: email });
};

export const updateUserStatusHandler = async (
  id: string,
  status: boolean
): Promise<IUser | null> => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $set: { isOnline: status } },
    { new: true }
  );
  return user;
};

// class that is responsible for decoded token verification and retrieval
export class authorizationHandler {
  private decodedToken?: IDecodedToken;
  async verifyToken(token: string): Promise<IDecodedToken | null> {
    let decoded = jwt.verify(token, env.ACCESS_SECRET_TOKEN) as JwtPayload;
    console.log(decoded);
    if (!decoded) {
      return null;
    } else {
      this.decodedToken = {
        id: decoded.id,
      };
      return this.decodedToken;
    }
  }

  async verifyRefreshToken(token: string): Promise<IDecodedToken | null> {
    let decoded = jwt.verify(token, env.REFRESH_SECRET_TOKEN) as JwtPayload;
    if (!decoded) {
      return null;
    } else {
      this.decodedToken = {
        id: decoded.id,
      };
      return this.decodedToken;
    }
  }

  // method that returns the decoded token
  getDecodedToken(): IDecodedToken | undefined {
    return this.decodedToken;
  }
}
