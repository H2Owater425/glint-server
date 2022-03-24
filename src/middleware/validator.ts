import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";
import HttpException from "../exceptions/http";

function validator(type: any): RequestHandler {
  return (req, res, next) => {
    const body = req.body;
    console.log(req.body);
    if (body === undefined) {
      next(new HttpException(400, "no passed data"));
    }

    console.log(plainToInstance(type, body));
    validate(plainToInstance(type, body)).then((errors: ValidationError[]) => {
      console.log(errors);
      if (errors.length === 0) next();
      else next(new HttpException(400, "missing values"));
    });
  };
}

export default validator;
