import {
  RegisterResponseType,
  RegisterRequest,
  LoginRequest,
  LoginResponseType,
} from "../types/auth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (
  email: string,
  password: string
): Promise<RegisterResponseType> => {
  const requestData: RegisterRequest = { email, password };

  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
  });

  const data: RegisterResponseType = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const login = async (
  email: string,
  password: string
): Promise<LoginResponseType> => {
  const requestData: LoginRequest = { email, password };

  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  const data: LoginResponseType = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
