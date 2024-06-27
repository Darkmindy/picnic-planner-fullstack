import { Response } from "express";
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
	createToken,
} from "../utility/commonAuthFunctions";
import { IDecodedToken } from "../validation/decodedToken.interface";

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

		const newToken = createToken(id);
		await updateRefreshToken(refreshToken, newToken.refreshToken);

		const decoded: IDecodedToken | null = await authHandler.verifyToken(
			newToken.accessToken
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
			.header("Authorization", `Bearer ${newToken.accessToken}`)
			.json({
				message: "New access token generated successfully",
				accessTokenExp: accessTokenExp,
				refreshToken: newToken.refreshToken, //send new refresh token
			});
	} catch (error) {
		res.status(500).json(
			"Internal Server Error: Failed to fetch new token" + error
		);
	}
};
