import {
  LoadClientsUseCase,
} from "@/modules/clients/domain/use-cases";
import { Controller } from "@/shared";
import { created } from "@/shared/helpers";
import { Http, Validator } from "@/shared/protocols";
import { ZodObjectValidation } from "@/shared/validations";
import {
  LoadClientReqQuery,
  loadClientsControllerValidation,
} from "./load-clients-controller.helpers";
import { clientPgRepository } from "@/modules/clients/infra/clients-pg-repository";

type Req = Http.Request<unknown, unknown, LoadClientReqQuery>;

export const makeLoadClientsController = () => {
  class LoadClientController extends Controller<
    unknown,
    unknown,
    LoadClientReqQuery
  > {
    constructor(private readonly useCase: LoadClientsUseCase) {}

    override async perform(httpRequest: Req): Promise<Http.Response<unknown>> {
      const operation = await this.useCase.execute({ ...httpRequest.query });

      return created(operation.result);
    }

    override buildValidators(httpRequest: Req): Validator[] {
      return [
        new ZodObjectValidation(loadClientsControllerValidation, {
          page: httpRequest.query?.page,
          limit: httpRequest.query?.limit,
        }),
      ];
    }
  }

  const useCase = new LoadClientsUseCase(clientPgRepository);
  return new LoadClientController(useCase);
};
