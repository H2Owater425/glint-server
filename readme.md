# self develop server

server of self develop web and app

# register new router

1. make a new folder in `src/routers`

```
routers
├───register
├───root
└───example // new folder
```

2. generate `index.ts` in folder you made

```
routers
  :
├───example
    └───index.ts
```

3. export default router (must follow [`IRouters`](/src/types/index.ts) type)
   [example](/src/routers/root/index.ts)

```
interface IRouters {
  root: string  // root path of router
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
    config?: Object // req.config
  }[]
}
```

4. import the router from `routers/index.ts`and export all router

```
import example from './example'
import root from './root'

export default [root, example]
```
