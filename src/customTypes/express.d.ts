export {};

declare global {
  namespace Express {
    interface Request {
      config?: Object
    }
  }
}