import { SessionOptions } from "iron-session";

const cookieSecure =
  process.env.COOKIE_SECURE === "true"
    ? true
    : process.env.COOKIE_SECURE === "false"
      ? false
      : process.env.NODE_ENV === "production";

function getConfiguredAdminUsernames(): string[] {
  const usernames = [
    "admin",
    process.env.ODOO_USERNAME,
    process.env.ADMIN_USERNAMES
  ]
    .filter((value): value is string => Boolean(value))
    .flatMap((value) => value.split(","))
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return Array.from(new Set(usernames));
}

export function isAdminUsername(username: string | null | undefined): boolean {
  if (!username) {
    return false;
  }

  return getConfiguredAdminUsernames().includes(username.trim().toLowerCase());
}

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "odoo_auth_session",
  cookieOptions: {
    secure: cookieSecure,
  },
};
