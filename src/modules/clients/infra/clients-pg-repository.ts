import { pgClient } from "@/shared/infra";
import { ClientRepository } from "../domain/repositories";
import { CreateClientRepository } from "../domain/repositories/create-client-repository";
import { LoadClientsRepository } from "../domain/repositories/load-clients-repository";

export class ClientPgRepository implements ClientRepository {
  async create(
    params: CreateClientRepository.Params
  ): CreateClientRepository.Response {
    const client = await pgClient.query(
      `INSERT INTO client(name, email, phone) VALUES($1, $2, $3) RETURNING id`,
      [params.name, params.email, params.phone]
    );

    console.log(client)
  }

  async load(
    params: LoadClientsRepository.Params
  ): LoadClientsRepository.Response {
    return {
      clients: [],
      totalElements: 0,
    };
  }
}

export const clientPgRepository = new ClientPgRepository()