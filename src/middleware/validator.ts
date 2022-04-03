import { Request, NextFunction, RequestHandler } from 'express'
import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import HttpException from '@exceptions/http'

// bodyValidateHandler
export default function (type: any): RequestHandler {
  return (request: Request, response: unknown, next: NextFunction): void => {
    const body = request.body

    if (typeof body === 'undefined') {
      next(new HttpException(400, 'no passed data'))

			return
		}

		validate(plainToInstance(type, body)).then(
			(errors: ValidationError[]): void => {
				if (errors.length === 0) {
					next()

					return
				}

				const exceptions: string[] = []

				for (let i = 0; i < errors.length; i++) {
					exceptions.push(Object.values(errors[i].constraints)[0])
				}

				next(
					new HttpException(400, 'missing or invalid data', {
						errors: exceptions,
					})
				)

				return
			}
		)
  }
}
