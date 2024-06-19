import { z } from "zod";
import { ZUserSchema } from "./user.interface";

export const ZRefreshTokenSchema = z.object({
	token: z.string().min(1),
	user: ZUserSchema,
	createdAt: z
		.date()
		.default(() => new Date(Date.now()))
		.refine(
			(data) => data <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			{
				message: "The 'createdAt' date must be within 7 days from now",
			}
		),
});

// create interface
export type IRefreshToken = z.infer<typeof ZRefreshTokenSchema>;
