import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

export interface User {
  name: String,
  token: String
}




export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function useMatchesData(
  id: string
): any {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

function isUser(user: any): user is User {
  return user && typeof user === "object" && typeof user.name === "string";
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}