import { createCookieSessionStorage } from "@remix-run/node";

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", 
    sameSite: "lax", 
    path: "/", 
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
  },
});

export type AuthUser = {
    name: string;
    token: string;
};

export let { getSession, commitSession, destroySession } = sessionStorage;