import { fastifyRouteAdapter } from "@/main/adapters/fastify-route-adapter";
import { FastifyInstance } from "fastify";
import { makeLoadClientsController, makeRegisterClientController } from "./controllers";

export const clientRoutes = (app: FastifyInstance) => {
  const ROUTE = "/clients" as const;

  app.post(ROUTE, fastifyRouteAdapter(makeRegisterClientController()));
  app.get(ROUTE, {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          limit: { type: 'number' },
          page: { type: 'number' },
          keyword: { type: 'string' },
        }
      }
    }
  },fastifyRouteAdapter(makeLoadClientsController()));
};
