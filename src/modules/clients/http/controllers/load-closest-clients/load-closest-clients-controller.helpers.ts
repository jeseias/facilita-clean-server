import { z } from "zod";

export const loadClosestClientsControllerValidation = z.object({
  position_x: z.number(),
  position_y: z.number(),
});

export type LoadClosestClientsReqQuery = z.infer<
  typeof loadClosestClientsControllerValidation
>;
