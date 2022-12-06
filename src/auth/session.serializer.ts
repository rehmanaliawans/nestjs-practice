import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { PassportStatic } from "passport";

@Injectable()
export class SessionSerializer implements PassportSerializer {
  serializeUser(user: any, done: Function) {
    done(null, user);
  }
  deserializeUser(payload: any, done: Function) {
    done(null, payload);
  }
  getPassportInstance(): PassportStatic {
    throw new Error("Method not implemented.");
  }
}
