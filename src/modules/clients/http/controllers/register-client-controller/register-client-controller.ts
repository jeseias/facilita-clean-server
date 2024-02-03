import { RegisterClientUseCase } from "@/modules/clients/domain/use-cases";
import { Controller } from "@/shared";
import { created } from "@/shared/helpers";
import { Http, Validator } from "@/shared/protocols";
import {
  RegisterClientReqBody,
  registerClientControllerValidation,
} from "./register-client-controller.helpers";
import { ZodObjectValidation } from "@/shared/validations";
import { clientPgRepository } from "@/modules/clients/infra/clients-pg-repository";

type Req = Http.Request<RegisterClientReqBody>;

export const makeRegisterClientController = () => {
  class RegisterClientController extends Controller {
    constructor(private readonly useCase: RegisterClientUseCase) {
      super();
    }

    override async perform(httpRequest: Req): Promise<Http.Response<unknown>> {
      const operation = await this.useCase.execute(
        httpRequest.body as RegisterClientReqBody
      );

      return created(operation.result);
    }

    override buildValidators(httpRequest: Req): Validator[] {
      return [
        new ZodObjectValidation(registerClientControllerValidation, {
          phone: httpRequest.body?.phone,
          email: httpRequest.body?.email,
          name: httpRequest.body?.name,
        } as RegisterClientReqBody),
      ];
    }
  }

  const useCase = new RegisterClientUseCase(clientPgRepository);
  return new RegisterClientController(useCase);
};
