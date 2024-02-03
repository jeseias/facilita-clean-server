import { UseCase, UseCaseResponse } from "@/shared";
import { Client } from "../../entities/clients";
import { ClientRepository } from "../../repositories";
import { LoadClientsRepository } from "../../repositories/load-clients-repository";

type Params = LoadClientsRepository.Params;
type Result = {
  clients: Client.Model[];
  totalElements: number;
};

export class LoadClientsUseCase extends UseCase<Params, Result> {
  constructor(private readonly clientRepository: ClientRepository) {}

  protected override async perform(
    params: Params
  ): Promise<UseCaseResponse<Result>> {
    const result = await this.clientRepository.load(params);
    return this.casePassed(result);
  }
}
