import { CreateClientRepository } from "./create-client-repository";
import { LoadClientsRepository } from "./load-clients-repository";
import { LoadClosestClientsRepository } from "./load-closest-clients-repository";

export type ClientRepository = CreateClientRepository.Contract &
  LoadClientsRepository.Contract &
  LoadClosestClientsRepository.Contract;
