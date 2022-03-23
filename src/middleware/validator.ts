import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/http'

function validator(type: any): RequestHandler {
  return (req, res, next) => {
    const body = req.body
    if(body===undefined) {
      next(new HttpException(400, 'no body'))
      return
    }

    validate(plainToInstance(type, body))
    .then((errors: ValidationError[]) =>{
      console.log(errors)
      if(errors.length === 0) next()
      else next(new HttpException(400, ''))
    })
  }
}

export default validator