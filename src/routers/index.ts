import { Router, Request, Response } from "express";
import Controllers from "../interface/controllers";

class Home implements Controllers {
  public path = "/";
  public router = Router();

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter() {
    this.router.get(this.path, this.getRoot);
  }

  private getRoot(req: Request, res: Response) {
    res.json({
      status: 200,
      message: "working good:)",
    });
  }
}

export default Home;
