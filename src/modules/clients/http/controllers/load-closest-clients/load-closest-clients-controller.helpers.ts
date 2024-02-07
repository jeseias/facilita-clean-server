import { z } from "zod";

export const loadClosestClientsControllerValidation = z.object({
  position_x: z.number().optional(),
  position_y: z.number().optional(),
});

export type LoadClosestClientsReqQuery = z.infer<
  typeof loadClosestClientsControllerValidation
>;
