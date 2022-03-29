import {RequestHandler} from 'express'

export interface IRouters {
  root: string
  routers: {
    path: string
    method:
      | 'all'
      | 'get'
      | 'post'
      | 'put'
      | 'delete'
      | 'patch'
      | 'options'
      | 'head'
    handler: RequestHandler
    middleware?: RequestHandler[]
    config?: Object
  }[]
}
