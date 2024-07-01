import { z } from "zod";
export const ZEventSchema = z.object({
	title: z.string().toLowerCase().min(1).max(50),
	description: z.string().min(1).max(200),
	location: z.string().min(1).max(50), // implement later with .url() property
	date: z.string().min(10).max(10), // implement later with date() format
});

export const ZOptionalEvent = ZEventSchema.partial();
export type IOptionalEvent = z.infer<typeof ZOptionalEvent>;
export type IEvent = z.infer<typeof ZEventSchema>;
