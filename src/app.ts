import express, {Router} from 'express'
import {initializeApp, applicationDefault} from 'firebase-admin/app'
import Controller from './interface/controllers'
import ErrorHandler from './middleware/error'
import {IRouters} from './types'
import URLPathJoin from './lib/URLPathJoin'

export default class App {
  public app: express.Application

  constructor(controllers) {
    this.app = express()

    this.initializeMiddlewares()
    this.initializeRouter(controllers)
    this.initializeErrorHandler()
    this.connectFireStore()
  }

  private initializeRouter(controllers: IRouters[]): void {
    controllers.forEach(({root, routers}) => {
      routers.forEach(({path, method, middleware = [], handler, config}) => {
        this.app[method](
          URLPathJoin(root, path),
          [
            ...middleware,
            (_, res, next) => {
              res.config = config
              next()
            },
          ],
          handler
        )
      })
    })
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

  private initializeErrorHandler() {
    this.app.use(ErrorHandler)
  }

  public listen(): void {
    const PORT: string | number = process.env.PORT || 3000

    this.app.listen(PORT, () => {
      console.log('listening on port ' + PORT)
    })
  }
}
