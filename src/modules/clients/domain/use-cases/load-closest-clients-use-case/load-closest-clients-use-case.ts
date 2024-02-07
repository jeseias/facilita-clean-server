import { UseCase, UseCaseResponse } from "@/shared";
import { ClientRepository } from "../../repositories";
import { LoadClosestClientsRepository } from "../../repositories/load-closest-clients-repository";
import { Client } from "@prisma/client";

type Params = Partial<LoadClosestClientsRepository.Params>;
type Response = Client[];

export class LoadClosestClientsUseCase extends UseCase<Params, Response> {
  constructor(private readonly clientsRepository: ClientRepository) {
    super();
  }

  protected override async perform(
    params: Params
  ): Promise<UseCaseResponse<Response>> {
    const clients = await this.clientsRepository.loadClosestClients({
      position_x: params?.position_x || 0,
      position_y: params?.position_y || 0,
    });

    return this.casePassed(clients);
  } 
}
