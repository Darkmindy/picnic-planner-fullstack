import { z } from "zod";

export const ZDecodedSchema = z.object({
	id: z.string(),
});

export type IDecodedToken = z.infer<typeof ZDecodedSchema>;
