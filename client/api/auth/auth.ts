import { User } from "../../src/types/user.types";
import { BASE_URL } from "./api";

export const registerRequest = async (user: User)=> {
 return await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });

};

export const loginRequest = async (user: User) => {
  return await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
};

export const logoutRequest = async () => {
  return await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};


export const verifyTokenRequest = async () => {
  // Usamos nuestro wrapper 'apiFetch' que ya tiene la BASE_URL
  // o fetch directamente si lo prefieres para esta llamada específica.
  return await fetch("http://localhost:3312/api/auth/refresh-token", {
    method: "POST",
    credentials: "include",
  });
};
