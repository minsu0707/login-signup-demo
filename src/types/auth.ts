export interface UserType {
  id: number;
  email: string;
}

export interface LoginResponseType {
  message: string;
  token: string;
  user: UserType;
}

export interface RegisterResponseType {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface ApiError {
  message: string;
}
