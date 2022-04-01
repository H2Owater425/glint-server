import { IRouters } from '@Ctypes/index'
import { rootHandler } from './root.handler'

const Root: IRouters = {
  root: '/',
  routers: [
    {
      path: '/',
      method: 'get',
      handler: rootHandler,
      config: {
        needAuth: true,
      },
    },
    {
      path: '/a',
      method: 'get',
      handler: rootHandler,
      config: {
        foo: 'bar',
      },
    },
    {
      path: '/b',
      method: 'get',
      handler: rootHandler,
    },
  ],
}

export default Root
