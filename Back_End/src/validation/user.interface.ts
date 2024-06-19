import mongoose from "mongoose";
import { z } from "zod";

// create enum for roles
export const Roles = ["admin", "user"] as const; //? hp of adding 'guest' role

export const ZUserSchema = z.object({
	name: z.string().min(1),
	email: z.string().toLowerCase().email(),
	password: z.string().min(8).max(32),
	role: z.enum(Roles).default("user"),
	isOnline: z.boolean().optional().default(false),
});

// create interface
export interface IUser extends z.infer<typeof ZUserSchema> {
	_id?: mongoose.Types.ObjectId;
}
