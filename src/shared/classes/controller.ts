import { badRequest, serverError } from "../helpers";
import { Validator } from "../protocols";
import { Http } from "../protocols/http";
import { ValidationComposite } from "../validations";
import { AppError } from "./app-error";

export abstract class Controller<
  Body = any,
  Params = any,
  Query = any,
  Headers = any
> {
  abstract perform(
    httpRequest: Http.Request<Body, Params, Query, Headers>
  ): Promise<Http.Response>;

  async handle(
    httpRequest: Http.Request<Body, Params, Query>
  ): Promise<Http.Response> {
    try {
      const error = await this.validate(httpRequest);

      if (error !== undefined) return badRequest(error);

      return await this.perform(httpRequest);
    } catch (error) {
      console.log("==>==> SERVER ERROR", error);
      return serverError(error as AppError);
    }
  }

  buildValidators(httpRequest: any): Validator[] {
    return [];
  }

  private async validate(httpRequest: any): Promise<AppError | undefined> {
    const validators = this.buildValidators(httpRequest);
    return await new ValidationComposite(validators).validate();
  }
}
