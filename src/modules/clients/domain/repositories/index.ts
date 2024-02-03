import { CreateClientRepository } from "./create-client-repository";
import { LoadClientsRepository } from "./load-clients-repository";

export type ClientRepository = CreateClientRepository.Contract &
  LoadClientsRepository.Contract;
