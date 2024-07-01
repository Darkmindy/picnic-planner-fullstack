import mongoose from "mongoose";
import { z } from "zod";
import { ZEventSchema } from "./event.valitation";
// create enum for roles
export const Roles = ["admin", "user"] as const; //? hp of adding 'guest' role

export const ZUserSchema = z.object({
	name: z.string().min(1).optional(),
	email: z.string().toLowerCase().email(),
	password: z.string().min(8).max(32),
	role: z.enum(Roles).default("user"),
	isOnline: z.boolean().optional().default(false),
	events: z.array(ZEventSchema).optional(),
	friends: z.array(z.string()).optional(),
});

// ZLogoutSchema
export const ZLogOutSchema = z.object({
	id: z.string().uuid().optional(),
});

// create interface
// create optional interface
export const ZOptionalUser = ZUserSchema.partial();
export type IOptionalUser = z.infer<typeof ZOptionalUser>;
export interface IUser extends z.infer<typeof ZUserSchema> {
	_id?: mongoose.Types.ObjectId;
}
