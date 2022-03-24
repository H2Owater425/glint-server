import { Router, Request, Response, NextFunction } from "express";
import controllers from "../../interface/controllers";
import { getFirestore } from "firebase-admin/firestore";
import validator from "../../middleware/validator";
import UserDto from "./user.dto";
import HttpException from "../../exceptions/http";

class Resigter implements controllers {
  public path = "/register";
  public router = Router();

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter() {
    this.router.post("/", this.register);
    this.router.post("/add", validator(UserDto), this.addUser);
  }

  private register(req: Request, res: Response, next: NextFunction) {
    res.json({
      message: "hi!",
    });
  }

  private async addUser(req: Request, res: Response, next: NextFunction) {
    const db = getFirestore();
    const userRef = db.collection("users");

    try {
      await userRef.doc("kuro").set({
        email: "kraccoon@kakao.com",
        age: 18,
      });
      res.json({ message: "sucess" });
    } catch (error) {
      console.log(error);
      console.log("error ");
      next(new HttpException(500, "server error"));
    }
  }
}

export default Resigter;
