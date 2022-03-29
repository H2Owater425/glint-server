import { Response } from "express-serve-static-core";

declare module "express-serve-static-core" {
  export interface Response {
    config: Object
  }
}