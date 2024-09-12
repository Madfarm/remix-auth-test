import { createCookieSessionStorage } from "@remix-run/node";

if(!process.env.SESSION_SECRET) {
  throw new Error("Session secret is required")
}

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", 
    sameSite: "lax", 
    path: "/", 
    httpOnly: true, 
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production", 
  },
});

export type AuthUser = {
    name: string;
    token: string;
};

export let { getSession, commitSession, destroySession } = sessionStorage;