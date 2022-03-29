import {Request, Response} from 'express'

export function rootHandler(req: Request, res: Response) {
  console.log(res['config'])
  res.json(res['config'])
}
