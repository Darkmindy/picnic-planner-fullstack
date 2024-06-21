import { z } from "zod";
import { env } from "../utility/env";
import { ZUserSchema } from "./user.interface";

export const ZRefreshTokenSchema = z.object({
	token: z.string().min(1),
	user: ZUserSchema,
	createdAt: z.date().default(() => new Date(Date.now())),
});

// create interface
export type IRefreshToken = z.infer<typeof ZRefreshTokenSchema>;
