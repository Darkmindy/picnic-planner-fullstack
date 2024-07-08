import { Response } from "express";
import jwt from "jsonwebtoken";
import {
	authHandler,
	ExtendedRequest,
} from "../middleware/authorization.middleware";
import {
	findRefreshToken,
	updateRefreshToken,
} from "../services/refreshToken.service";
import {
	calculateAccessTokenExpiresAt,
	createNewAccessToken,
} from "../utility/commonAuthFunctions";
import { env } from "../utility/env";
import { IDecodedToken } from "../validation/decodedToken.validation";
import { IFormattedRefreshToken } from "../validation/refreshToken.validation";

export const fetchingNewToken = async (req: ExtendedRequest, res: Response) => {
	try {
		// get refresh token
		const refreshToken = req.get("refresh-token") as string;

		if (!refreshToken) {
			return res
				.status(401)
				.json("Unauthorized: refresh token not provided");
		}

		const findingRefreshToken = await findRefreshToken(refreshToken);

		if (!findingRefreshToken) {
			return res
				.status(401)
				.json(
					"Unauthorized: Invalid token, your access may be expired or your refresh token is not found in database"
				);
		}

		const verifyingRefreshToken: IDecodedToken | null =
			await authHandler.verifyRefreshToken(refreshToken);

		if (!verifyingRefreshToken) {
			return res
				.status(401)
				.json(
					"Unauthorized: Invalid token, your access may be expired"
				);
		}

		const id = verifyingRefreshToken.id;

		if (!id) {
			return res
				.status(401)
				.json(
					"Unauthorized: Invalid token, your access may be expired"
				);
		}

		const newRefreshToken = jwt.sign({ id }, env.REFRESH_SECRET_TOKEN, {
			expiresIn: env.REFRESH_TOKEN_EXPIRATION_TIME + "s",
		});

		// formatting refresh token for client side
		const formattedRefreshToken: IFormattedRefreshToken = {
			token: newRefreshToken,
		};

		const updatedRefreshToken = await updateRefreshToken(
			refreshToken,
			formattedRefreshToken.token
		);

		const newAccessToken = createNewAccessToken(id);

		const decoded: IDecodedToken | null = await authHandler.verifyToken(
			newAccessToken
		);

		if (!decoded) {
			return res
				.status(401)
				.json(
					"Unauthorized: Invalid token, your access may be expired"
				);
		}

		// calculate exact expiration time for access token
		const accessTokenExp = calculateAccessTokenExpiresAt();

		req.user = { _id: decoded.id } as ExtendedRequest["user"]; //specifying as ExtendRequest because it does not take a paramater that could be null otherwise
		return res
			.status(200)
			.header("Authorization", `Bearer ${newAccessToken}`)
			.json({
				message: "New access token generated successfully",
				accessTokenExp: accessTokenExp,
				refreshToken: updatedRefreshToken?.token, //send new refresh token
			});
	} catch (error) {
		res.status(500).json(
			"Internal Server Error: Failed to fetch new token" + error
		);
	}
};
