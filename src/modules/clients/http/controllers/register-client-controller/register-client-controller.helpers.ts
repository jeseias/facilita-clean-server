import { z } from "zod";

export const registerClientControllerValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  position_x: z.number(),
  position_y: z.number(),
});

export type RegisterClientReqBody = z.infer<
  typeof registerClientControllerValidation
>;
