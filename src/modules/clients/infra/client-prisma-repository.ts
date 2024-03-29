import { prisma } from "@/lib/prisma";
import { ClientRepository } from "../domain/repositories";
import { CreateClientRepository } from "../domain/repositories/create-client-repository";
import { LoadClientsRepository } from "../domain/repositories/load-clients-repository";
import { LoadClosestClientsRepository } from "../domain/repositories/load-closest-clients-repository";
import { Client } from "@prisma/client";

class ClientPrismaRepository implements ClientRepository {
  async create(
    params: CreateClientRepository.Params
  ): CreateClientRepository.Response {
    const client = await prisma.client.create({
      data: params,
    });

    return client;
  }

  async load(
    params: LoadClientsRepository.Params
  ): LoadClientsRepository.Response {
    const skip = (params.page - 1) * params.limit;
    const clients = await prisma.client.findMany({
      skip,
      take: params.limit,
      where: {
        OR: [
          { email: { contains: params?.keyword || "", mode: "insensitive" } },
          { phone: { contains: params?.keyword || "", mode: "insensitive" } },
          { name: { contains: params?.keyword || "", mode: "insensitive" } },
        ],
      },
    });
    const totalElements = await prisma.client.count();

    return {
      clients,
      totalElements,
    };
  }

  async loadClosestClients(
    params: LoadClosestClientsRepository.Params
  ): LoadClosestClientsRepository.Response {
    const clients: Client[] = await prisma.$queryRaw`
      SELECT id, name, email, position_x, position_y, sqrt(position_x * position_x + position_y * position_y) AS distance
      FROM "Client"
      ORDER BY distance
      LIMIT 10;`;

    return { clients };
  }
}

export const clientPrismaRepository = new ClientPrismaRepository();
