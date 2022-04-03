// HttpException
export default class extends Error {
  public status: number
  public message: string
  public more: unknown

  constructor(status: number, message: string, more?: unknown) {
    super(message)
    this.status = status
    this.message = message
    this.more = more
  }
}