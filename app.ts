import express, {Application, Request, Response} from 'express'
import session from 'express-session'
import {randomBytes} from 'crypto'
import admin from 'firebase-admin'
import axios from 'axios'
import 'dotenv/config'
import qs from 'qs'
import * as jwt from 'jsonwebtoken'
import {v5 as uuidv5} from 'uuid'

admin.initializeApp({
  databaseURL: 'https://self-develop-web-predeploy-default-rtdb.firebaseio.com',
})

const db = admin.database()
const userRef = db.ref('user')

const app: Application = express()

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
)

app.get('/', (req: Request, res: Response) => {
  res.send('<a href="/auth/google?redirect=/main">login with google</a>')
})

app.get('/auth/google', async (req: Request, res: Response) => {
  const getHash = (): string => {
    try {
      return randomBytes(32).toString('hex')
    } catch (error) {
      res.status(500).send('server error')
      return undefined
    }
  }

  const queries = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI_DEV, // development uri
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/userinfo.email',
    state: getHash(),
    access_type: 'offline',
  }

  req.session['googleState'] = queries.state

  res.redirect(
    'https://accounts.google.com/o/oauth2/v2/auth?' + qs.stringify(queries)
  )
})

app.get('/auth/google/callback', async (req: Request, res: Response) => {
  const sessionState = req.session['googleState']
  let state = req.query.state as string
  
  if (sessionState !== state && process.env.NODE_ENV !== 'development') {
    res.status(401).send('not allowed login')
    return
  }

  delete req.session['googleState'] // reset the session

  const getToken = async () => {
    const queries = {
      code: req.query.code as string,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_PASSWORD,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI_DEV,
      grant_type: 'authorization_code',
    }

    let tokenReq
    try {
      tokenReq = await axios.post(
        'https://oauth2.googleapis.com/token',
        qs.stringify(queries),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        }
      )
    } catch (error) {
      console.log(error)
      res.status(500).send('server error')
      return null
    }
    return tokenReq.data
  }

  const token = await getToken()
  const profile = jwt.decode(token.id_token)

  console.log(profile)
  try {
    await userRef.update({
      [uuidv5(profile.email, uuidv5.URL)]: {
        ...profile,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'server error',
    })

    return
  }

  const jwtToken = jwt.sign(profile, process.env.JWTSECRET)

  res.cookie('token', jwtToken)
  res.redirect('/main')
})

app.listen(process.env.PORT || 3000)
