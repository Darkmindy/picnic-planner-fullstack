// import { Response } from "express";
// import {
//   authHandler,
//   ExtendedRequest,
// } from "../middleware/authorization.middleware";
// import { RefreshToken } from "../models/refreshToken.model";
// import { createToken } from "../utility/commonAuthFunctions";
// import { IDecodedToken } from "../validation/decodedToken.interface";

// export const fetchingNewToken = async (req: ExtendedRequest, res: Response) => {
//   try {
//     const refreshToken = req.get("refresh-token") as string;
//     if (!refreshToken) {
//       return res.status(401).json("Unauthorized: no token was given 1");
//     }

//     const findingRefreshToken = await RefreshToken.findOne({token: refreshToken});
//     if (!findingRefreshToken) {
//       return res
//         .status(401)
//         .json(
//           "Unauthorized: Invalid token, your access may be expired2 NOT FOUND IN DATABASE"
//         );
//     }

//     const verifyingRefreshToken: IDecodedToken | null =
//       await authHandler.verifyToken(refreshToken);
//     if (!verifyingRefreshToken) {
//       return res
//         .status(401)
//         .json("Unauthorized: Invalid token, your access may be expired 4");
//     }

//     const id = verifyingRefreshToken?.id?.toString();
//     if (!id) {
//       return res
//         .status(401)
//         .json("Unauthorized: Invalid token, your access may be expired 5");
//     }

//     const newToken = createToken(id);
//     await RefreshToken.findOneAndUpdate(
//       { token: refreshToken },
//       { token: newToken.refreshToken },
//       { new: true, useFindAndModify: false }
//     );

//     const decoded: IDecodedToken | null = await authHandler.verifyToken(
//       newToken.accessToken
//     );
//     if (!decoded) {
//       return res
//         .status(401)
//         .json("Unauthorized: Invalid token, your access may be expired 6");
//     }

//     req.user = { _id: decoded.id } as ExtendedRequest["user"]; //specifying as EXtend.. because it does not take a paramater that could be null otherwise
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json("Internal Server Error: Failed to fetch new token");
//   }
// };

import { Response } from "express";
import {
  authHandler,
  ExtendedRequest,
} from "../middleware/authorization.middleware";
import { RefreshToken } from "../models/refreshToken.model";
import { createToken } from "../utility/commonAuthFunctions";
import { IDecodedToken } from "../validation/decodedToken.interface";

export const fetchingNewToken = async (req: ExtendedRequest, res: Response) => {
  try {
    const refreshToken = req.get("refresh-token") as string;
    console.log(`Received refresh token: ${refreshToken}`);

    if (!refreshToken) {
      console.log("No refresh token provided");
      return res.status(401).json("Unauthorized: no token was given");
    }

    const findingRefreshToken = await RefreshToken.findOne({
      token: refreshToken,
    });
    if (!findingRefreshToken) {
      console.log("Refresh token not found in database");
      return res
        .status(401)
        .json(
          "Unauthorized: Invalid token, your access may be expired or not found in database"
        );
    }
    console.log("Refresh token found in database");

    const verifyingRefreshToken: IDecodedToken | null =
      await authHandler.verifyRefreshToken(refreshToken);
    if (!verifyingRefreshToken) {
      console.log("Refresh token verification failed");
      return res
        .status(401)
        .json("Unauthorized: Invalid token, your access may be expired");
    }
    console.log("Refresh token verified successfully");

    const id = verifyingRefreshToken.id;
    if (!id) {
      console.log("No user ID found in decoded token");
      return res
        .status(401)
        .json("Unauthorized: Invalid token, your access may be expired");
    }
    console.log(`User ID from token: ${id}`);

    const newToken = createToken(id);
    console.log("New tokens created");

    await RefreshToken.findOneAndUpdate(
      { token: refreshToken },
      { token: newToken.refreshToken },
      { new: true, useFindAndModify: false }
    );
    console.log("Refresh token updated in database");

    const decoded: IDecodedToken | null = await authHandler.verifyToken(
      newToken.accessToken
    );
    if (!decoded) {
      console.log("New access token verification failed");
      return res
        .status(401)
        .json("Unauthorized: Invalid token, your access may be expired");
    }
    console.log("New access token verified successfully");

    req.user = { _id: decoded.id } as ExtendedRequest["user"]; //specifying as EXtend.. because it does not take a paramater that could be null otherwise
    console.log(`Request user set with ID: ${decoded.id}`);

    return res.status(200).json({
      accessToken: newToken.accessToken,
      refreshToken: newToken.refreshToken,
    });
  } catch (error) {
    console.error("Error in fetchingNewToken:", error);
    return res
      .status(500)
      .json("Internal Server Error: Failed to fetch new token");
  }
};
