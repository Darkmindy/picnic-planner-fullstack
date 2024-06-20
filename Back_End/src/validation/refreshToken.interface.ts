import { z } from "zod";
import { env } from "../utility/env";
import { ZUserSchema } from "./user.interface";

export const ZRefreshTokenSchema = z
	.object({
		token: z.string().min(1),
		user: ZUserSchema,
		createdAt: z
			.date()
			.default(() => new Date(Date.now()))
			.refine(
				(data) =>
					data <=
					new Date(
						Date.now() +
							env.REFRESH_TOKEN_EXPIRATION_TIME *
								24 *
								60 *
								60 *
								1000
					),
				`The 'createdAt' date must be within ${env.REFRESH_TOKEN_EXPIRATION_TIME} days from now`
			),
		expiresAt: z.date(),
	})
	.extend({
		isExpired: z.boolean(), // Define as a virtual field
	});

// create interface
export type IRefreshToken = z.infer<typeof ZRefreshTokenSchema>;
