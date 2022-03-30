import {Request, Response} from 'express'

export function rootHandler(req: Request, res: Response): void {
  res.json(req.config)
}