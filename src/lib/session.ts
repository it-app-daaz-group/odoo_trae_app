import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "odoo_auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
