import {z} from "zod"
import mongoose from "mongoose";

export const ZUserSchema = z.object({
	name: z.string().min(1),
	email: z.string().toLowerCase().email(),
	password: z.string().min(8).max(32),
	isOnline: z.boolean().optional().default(false),
});

// create interface
export interface IUser extends z.infer<typeof ZUserSchema> {
	_id?: mongoose.Types.ObjectId;
}

