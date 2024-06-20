import {
  authHandler,
  ExtendedRequest,
} from "../middleware/authorization.middleware";
import { RefreshToken } from "../models/refreshToken.model";
import { createToken } from "../utility/commonAuthFunctions";
import { IDecodedToken } from "../validation/decodedToken.interface";
import { Response } from "express";

export const fetchingNewToken = async (req: ExtendedRequest, res: Response) => {
  try {
    const refreshToken = req.headers["refresh-token"] as string;
    const findingRefreshToken = RefreshToken.findOne({ refreshToken }); //
    if (!findingRefreshToken) {
      return res
        .status(401)
        .json("Unauthorized: Invalid token, your access may be expired");
      /*.redirect("/login");*/
    }
    console.log("refreshToken found in the database!")
    const verifyingRefreshToken: IDecodedToken | null =
      await authHandler.verifyRefreshToken(refreshToken);
    if (!verifyingRefreshToken) {
      return res
        .status(401)
        .json("Unauthorized: Invalid token, your access may be expired");
      /* .redirect("/login");*/
    }
    const id = verifyingRefreshToken?.toString();
    const newToken = createToken(id);
    await RefreshToken.findOneAndUpdate(
      { token: refreshToken },
      { token: newToken.refreshToken },
      { new: true, useFindAndModify: false }
    );
    const decoded: IDecodedToken | null = await authHandler.verifyToken(
      newToken.accessToken
    );
    req.user = { _id: decoded?.id } as ExtendedRequest["user"]; //specifying as EXtend.. because it does not take a paramater that could be null otherwise
    res.status(201).json(); /*.redirect("/logout");*/
  } catch (error) {
    return res
      .status(401)
      .json("Unauthorized: Invalid token, your access may be expired");
    /*.redirect("/login");*/
  }
};
