import express, { Application, Request, Response } from 'express'
import session from 'express-session'
import MongoDBStore from 'connect-mongodb-session'
import { randomBytes } from 'crypto'
import axios from 'axios'
import 'dotenv/config'
import { googleDialogue, googleToken } from '../types/oauthTypes'

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
  const getStateToken = (): string => {
    try {
      const buffer = randomBytes(32)
      return buffer.toString('hex')
    } catch (error) {
      res.status(500).send('server error')
      return undefined
    }
  }

  const combinedQueryString = (): string => {
    let queryString: string = ''
    for (const [query, value] of Object.entries(queries)) {
      queryString += `&${query}=${value}`
    }
    return queryString
  }

  const queries: googleDialogue = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI_DEV, // development uri
    response_type: 'code',
    scope: 'openid',
    state: getStateToken(),
  }

  req.session['googleState'] = queries.state

  res.redirect(
    'https://accounts.google.com/o/oauth2/v2/auth?' + combinedQueryString()
  )
})

app.get('/auth/google/callback', (req: Request, res: Response) => {
  const sessionState = req.session['googleState']
  const reqState = req.query.state

  if (sessionState !== reqState) {
    res.status(401).send('not allowed login')
  }

  req.session['googleState'] = '' // reset session

  let tokenReq

  const getToken = async () => {
    const queries: googleToken = {
      code: req.query.code as string,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_PASSWORD,
      redirect_uri: 'http://localhost:3000/',
      access_type: 'offline',
      grant_type: 'authorization_code'
    }

    try {
      tokenReq = await axios.post('https://oauth2.googleapis.com/token', {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          Accept: 'application/json'
        },
        data: new URLSearchParams(queries).toString()
      })
    } catch(error) {
      console.log(error)
      return
    } 

    console.log(tokenReq.data)
  }

  getToken()

  res.send('allowed login')
})

app.listen(3000)
