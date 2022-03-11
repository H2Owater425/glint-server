import express, { Application, Request, Response } from 'express'
import session from 'express-session'
import MongoDBStore from 'connect-mongodb-session'
import { randomBytes } from 'crypto'
import axios from 'axios'
import 'dotenv/config'
import { googleDialogue, googleToken } from '../types/oauthTypes'
import qs from 'qs'

const app: Application = express()

const store = new MongoDBStore(session)({
  uri: 'mongodb://localhost:27017/self-develop',
  collection: 'session',
})

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store,
  })
)

app.get('/', (req: Request, res: Response) => {
  res.send('<a href="/auth/google">login with google</a>')
})

app.get('/auth/google', async (req: Request, res: Response) => {
  const getHash = (): string => {
    try {
      const buffer = randomBytes(32)
      return buffer.toString('hex')
    } catch (error) {
      res.status(500).send('server error')
      return undefined
    }
  }

  const queries = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI_DEV, // development uri
    response_type: 'code',
    scope: 'openid email',
    state: getHash(),
  }

  req.session['googleState'] = queries.state

  res.redirect(
    'https://accounts.google.com/o/oauth2/v2/auth?' +
      new URLSearchParams(queries).toString()
  )
})

app.get('/auth/google/callback', async (req: Request, res: Response) => {
  const sessionState = req.session['googleState']
  const reqState = req.query.state

  if (sessionState !== reqState && process.env.NODE_ENV !== 'development') {
    res.status(401).send('not allowed login')
    return
  }

  req.session['googleState'] = '' // reset the session

  const getToken = async () => {
    const queries = {
      code: <string>req.query.code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_PASSWORD,
      redirect_uri: 'http://localhost:3000/auth/google/callback',
      grant_type: 'authorization_code',
    }

    let tokenReq
    try {
      tokenReq = await axios({
        method: 'POST',
        url: 'https://accounts.google.com/o/oauth2/token',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          code: req.query.code,
          client_id: '390910857176-1424t2jn9lbdg3ahmtle3c4u6drg0gq3.apps.googleusercontent.com',
          client_secret: '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',
          redirect_uri: 'http://localhost:3000/auth/google/callback',
          grant_type: 'authorization_code',
        },
      })
    } catch (error) {
      console.log(error)
      res.status(500).send('server error')
      return
    }
    return tokenReq
  }

  const token = await getToken()

  res.send(JSON.stringify(token))
  
})

app.get('/auth/google/code', (req, res) => {
  res.send('code')
})

app.listen(3000)
