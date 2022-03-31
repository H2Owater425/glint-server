import {Request, Response, NextFunction, RequestHandler} from 'express'
import {plainToInstance} from 'class-transformer'
import {validate, ValidationError} from 'class-validator'
import HttpException from '@exceptions/http'

function bodyValidator(type: any): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body
    console.log(req.body)
    if (body === undefined) {
      next(new HttpException(400, 'no passed data'))
    }

    validate(plainToInstance(type, body)).then((errors: ValidationError[]) => {
      if (errors.length === 0) next()
      else {
        const exceptions = errors.map((error: ValidationError) =>
          Object.values(error.constraints)
        )
        next(
          new HttpException(400, 'missing or invalid data', {
            errors: exceptions,
          })
        )
      }
    })
  }
}

export default bodyValidator
