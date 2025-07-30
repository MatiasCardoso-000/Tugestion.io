import { createContext } from "react";
import { User } from "../../types/user.types";

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  signUp: (data: User) => void;
  signIn: (data: User) => void;
  logout: () => void;
  isAuthenticated:boolean;
  errors: string[];
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: (user: User) => user,
  signUp: (data: User) => data,
  signIn: (data: User) => data,
  logout: () => {},
  isAuthenticated:false,
  errors: [],
  isLoading: true,
});
