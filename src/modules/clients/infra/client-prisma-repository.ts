import { ClientRepository } from "../domain/repositories";
import { CreateClientRepository } from "../domain/repositories/create-client-repository";
import { LoadClientsRepository } from "../domain/repositories/load-clients-repository";

export class ClientPrismaRepository implements ClientRepository {
  create(params: CreateClientRepository.Params): CreateClientRepository.Response {
    
  }
  load(params: LoadClientsRepository.Params): LoadClientsRepository.Response {
      
  }
}