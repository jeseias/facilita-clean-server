import { fastifyRouteAdapter } from "@/main/adapters/fastify-route-adapter";
import { FastifyInstance } from "fastify";
import { makeLoadClientsController, makeRegisterClientController } from "./controllers";
import { makeLoadClosestClientsController } from "./controllers/load-closest-clients/load-closest-clients-controller";

export const clientRoutes = (app: FastifyInstance) => {
  const ROUTE = "/clients" as const;

  app.post(
    ROUTE,
    {
      schema: {
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            position_x: { type: "number" },
            position_y: { type: "number" },
          },
        },
      },
    },
    fastifyRouteAdapter(makeRegisterClientController())
  );
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

  app.get(`${ROUTE}/location`, {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          position_x: { type: 'number' },
          position_y: { type: 'number' },
        }
      }
    }
  },fastifyRouteAdapter(makeLoadClosestClientsController()));
};
