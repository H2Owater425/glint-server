import { NextFunction, Response } from 'express'
import HttpException from '@exceptions/http'

// errorHandler
export default function (
  error: HttpException,
  request: unknown,
  response: Response,
  next: NextFunction
): void {
  error.status = error.status || 500

  const more = error?.more

  if (typeof more !== 'undefined') {
    console.log(more)
  }

  response
    .status(error.status)
    .json(
      Object.assign({ message: error.message || 'something went wrong' }, more)
    )

  next()

  return
}
