import { NextFunction, Response } from 'express'
import HttpException from '@exceptions/http'

// errorHandler
export default function (
  error: HttpException,
  request: unknown,
  response: Response,
  next: NextFunction
): void {
  const more: unknown = error?.more

  if (typeof more !== 'undefined') {
    console.log(more)
  }

  response.status(error.status || 500)

  const send: (data: object) => jsend.JSendObject =
    response.statusCode <= 400 ? response.jsend.fail : response.jsend.error

  send(
    Object.assign({ message: error.message || 'something went wrong' }, more)
  )

  next()

  return
}
