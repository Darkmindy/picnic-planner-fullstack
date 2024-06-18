import { NextFunction, Request, Response } from "express";
import { authorizationHandler } from "../services/user.service";
import { IDecodedToken } from "../validation/decodedToken.interface";

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
    const decoded: IDecodedToken | null = await authHandler.verifyToken(token);
    if (!decoded) {
      res.status(404).json({ message: "Token no longer available" }).redirect("/token");
    }
    //considerare se non inserire tutto il ragionamento in un altro endpoint!!!
    //   try {
    //     const refreshToken = req.headers["refresh-token"] as string;
    //     const findingRefreshToken = RefreshToken.findOne({ refreshToken });
    //     if (!findingRefreshToken) {
    //       return res
    //         .status(401)
    //         .json("Unauthorized: Invalid token, your access may be expired")
    //         .redirect("/login");
    //     }
    //     const verifyingRefreshToken: IDecodedToken | null =
    //       await authHandler.verifyToken(refreshToken);
    //     if (!verifyingRefreshToken) {
    //       return res
    //         .status(401)
    //         .json("Unauthorized: Invalid token, your access may be expired")
    //         .redirect("/login");
    //     }
    //     const id = verifyingRefreshToken?.toString();
    //     const newToken = createToken(id);
    //     await RefreshToken.findOneAndUpdate({
    //       refreshToken: newToken.refreshToken,
    //     });
    //     const decoded: IDecodedToken | null = await authHandler.verifyToken(
    //       newToken.accessToken
    //     );
    //     req.user = { _id: decoded?.id } as ExtendedRequest["user"]; //specifying as EXtend.. because it does not take a paramater that could be null otherwise
    //     next();
    //   } catch (error) {
    //     return res
    //       .status(401)
    //       .json("Unauthorized: Invalid token, your access may be expired")
    //       .redirect("/login");
    //   }
    // }
      req.user = { _id: decoded?.id } as ExtendedRequest["user"];

    next();
  } catch (error) {
    return res.status(500).json("Internal Server Error" + error);
  }
};
