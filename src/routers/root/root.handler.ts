import { Request, Response } from 'express'

export function rootHandler(request: Request, response: Response): void {
  response.jsend.success(request.config)

  return
}
