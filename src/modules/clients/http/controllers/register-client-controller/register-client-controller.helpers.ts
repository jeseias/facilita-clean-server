import { z } from "zod";

export const registerClientControllerValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

export type RegisterClientReqBody = z.infer<
  typeof registerClientControllerValidation
>;
