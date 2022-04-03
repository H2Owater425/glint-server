export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      PORT: string
      FIRESTORE_URL: string
      GOOGLE_APPLICATION_CREDENTIALS: string
    }
  }
}
