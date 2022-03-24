import express from "express";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import Controller from "./interface/controllers";
import ErrorHandler from "./middleware/error";

class App {
  public app: express.Application;

  constructor(controllers?: Controller[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeRouter(controllers);
    this.initializeErrorHandler();
    this.connectFireStore();
  }

  private initializeRouter(controllers: Controller[]) {
    controllers.forEach(({ path, router }) => {
      this.app.use(path, router);
    });
  }

  private connectFireStore() {
    initializeApp({
      credential: applicationDefault(),
      databaseURL: process.env.FIRESTORE_URL,
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeErrorHandler() {
    this.app.use(ErrorHandler);
  }

  public listen() {
    const PORT: string | number = process.env.PORT || 3000;

    this.app.listen(PORT, () => {
      console.log("listening on port " + PORT);
    });
  }
}

export default App;
