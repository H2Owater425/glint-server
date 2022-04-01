import { Response, NextFunction } from 'express'
export default (_, res: Response, next: NextFunction, config) => {
  res['config'] = config
  next()
}
