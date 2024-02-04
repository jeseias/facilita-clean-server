import { clientRoutes } from "@/modules/clients/http/clients.routes";
import { FastifyInstance } from "fastify";

export const appRoutes = async (app: FastifyInstance) => {
  clientRoutes(app);
};
