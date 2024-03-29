import { z } from "zod";

export const loadClientsControllerValidation = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  keyword: z.string().optional(),
});

export type LoadClientReqQuery = z.infer<typeof loadClientsControllerValidation>;
