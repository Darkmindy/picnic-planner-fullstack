import { NextFunction, Request, Response } from "express";
import { authorizationHandler } from "../services/user.service";
import { IDecodedToken } from "../validation/decodedToken.interface";
import { RefreshToken } from "../models/refreshToken.model";
import { createToken } from "../utility/commonAuthFunctions";

// create an instance of the authorizationHandler() class, in order to use it
export const authHandler = new authorizationHandler();

// Interface for request with decoded user information
export interface ExtendedRequest extends Request {
  user?: { _id: string };
}

export const authMiddleware = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json("Unauthorized: Token not provided");
  }

  try {
    const decoded = await authHandler.verifyToken(token);
    console.log(decoded);
    if (!decoded) {
      console.log("token not verified, redirect to endpoint ('/token')");
      res.redirect("/token");/*
        .status(401)
        .json({ message: "Authorization denied: Token no loger valid" });*/
    }
    // if (decoded) {
    req.user = { _id: decoded?.id } as ExtendedRequest["user"];
    // }

    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error verifying token:", error);

      // Differentiate between errors
      if (error.name === "ValidationError") {
        // Example: Database validation error
        return res
          .status(400)
          .json("Bad Request: Invalid refresh token format");
      } else {
        console.error("Error generating new token:", error);
        return res
          .status(500)
          .json("Internal Server Error: Failed to generate new token");
      }
    }
  }
};
