import { clientRoutes } from "@/modules/clients/http/clients.routes";
import { FastifyInstance } from "fastify";

export const appRoutes = (app: FastifyInstance) => {
  clientRoutes(app);
};
