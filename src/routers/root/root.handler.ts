import { Request, Response } from 'express'

export function rootHandler(request: Request, response: Response): void {
  response.json(request.config)

  return
}
