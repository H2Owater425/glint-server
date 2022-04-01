import express, { Request, NextFunction } from 'express'
import { initializeApp, applicationDefault } from 'firebase-admin/app'
import ErrorHandler from '@middleware/error'
import controllers from './routers'
import { join } from 'path'

export default class App {
  public app: express.Application

  constructor() {
    this.app = express()

    this.initializeMiddlewares()
    this.initializeRouter()
    this.initializeErrorHandler()
    this.connectFireStore()
  }

  private initializeRouter(): void {
    for (const { root, routers } of controllers) {
      for (const {
        path,
        method,
        middleware = [],
        handler,
        config,
      } of routers) {
        this.app[method](
          join(root, path).replace(/\\/g, '/'),
          [
            (req: Request, _: unknown, next: NextFunction) => {
              req.config = config
              next()
            },
            ...middleware,
          ],
          handler
        )
      }
    }
  }

  private connectFireStore(): void {
    initializeApp({
      credential: applicationDefault(),
      databaseURL: process.env.FIRESTORE_URL,
    })
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json())
  }

  private initializeErrorHandler(): void {
    this.app.use(ErrorHandler)
  }

  public listen(): void {
    const PORT: string | number = process.env.PORT || 3000

    this.app.listen(PORT, () => {
      console.log('listening on port ' + PORT)
    })
  }
}
