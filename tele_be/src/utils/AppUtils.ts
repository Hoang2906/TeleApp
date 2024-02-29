import {ValidationError} from "express-validator/src/base";
import {Result} from "express-validator";
import {Request} from "express";

export default class AppUtils {
  static getValidateError(errors: Result<ValidationError>): string|undefined {
    if (errors.isEmpty()) {
      return undefined
    }

    const firstError = errors.array()[0]
    return `${firstError.msg} ${firstError.location} ${firstError.param}`
  }

  static getPaginateParams (req: Request) {
    console.log(req.params);
  }
}

export function tryParseInt(value: any, def: number, radix?: number) {
  try {
    return parseInt(value, radix)
  } catch (e) {
    return def
  }
}

