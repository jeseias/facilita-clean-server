import { UseCase, UseCaseResponse } from "@/shared";
import { Client } from "../../entities/clients";
import { ClientRepository } from "../../repositories";
import { LoadClientsRepository } from "../../repositories/load-clients-repository";

type Params = Partial<LoadClientsRepository.Params>;
type Result = {
  clients: Client.Model[];
  totalElements: number;
};

export class LoadClientsUseCase extends UseCase<Params, Result> {
  constructor(private readonly clientRepository: ClientRepository) {
    super();
  }

  protected override async perform(
    params: Params
  ): Promise<UseCaseResponse<Result>> {
    const result = await this.clientRepository.load({
      limit: params.limit || 20,
      page: params.page || 1,
    });
    return this.casePassed(result);
  }
}
