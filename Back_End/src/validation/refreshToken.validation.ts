import { z } from "zod";
import { ZUserSchema } from "./user.validation";

export const ZRefreshTokenSchema = z.object({
	token: z.string().min(1),
	user: ZUserSchema,
});

// create interface
export type IRefreshToken = z.infer<typeof ZRefreshTokenSchema>;

// formatted refreshToken interface
export interface IFormattedRefreshToken {
	token: string;
}
