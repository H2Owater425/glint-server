# self develop server

server of self develop web and app

# Commit tule

We are going to follow angular contributing rules

- **build** : Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)

- **ci** : Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)

- **docs** : Documentation only changes

- **feat** : A new feature

- **fix** : A bug fix

- **perf** : A code change that improves performance

- **refactor** : A code change that neither fixes a bug nor adds a feature

- **style** : Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

- **test** : Adding missing tests or correcting existing tests

# PR rules

1. contribute only issue (if you need other modification, please make a new pr)
2. make a draft for long-time contribution
3. merge order is same as PR order
4. branch and PR name must a summary of contribution

# Contribution

## register new router

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
