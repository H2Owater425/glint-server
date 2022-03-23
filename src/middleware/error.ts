import {NextFunction, Request, Response} from 'express'
import HttpException from '../exceptions/http'

export default function error(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status || 500
  const message = error.message || 'something went wrong'

  res.status(status).json({message: message})
}
