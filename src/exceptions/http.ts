export default class Http extends Error {
  public status: number;
  public message: string
  public more?: any

  constructor(status: number, message: string, more?: any) {
    super(message);
    this.status = status;
    this.message = message;
    this.more = more
  }
}
