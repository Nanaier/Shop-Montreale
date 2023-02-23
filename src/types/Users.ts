import { Product } from "./productsType";

export type Role = "admin" | "customer";

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: Role;
  avatar: string;
}

export interface UserReducer {
  users: User[];
  currentUser: User | undefined;
}

export interface UserLoginCredential {
  email: string;
  password: string;
}
