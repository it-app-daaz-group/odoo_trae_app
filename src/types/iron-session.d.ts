import "iron-session";
import { SessionData } from "./iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user?: SessionData;
  }
}
