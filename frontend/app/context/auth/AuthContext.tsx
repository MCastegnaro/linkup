"use client";

import { AxiosAdapter } from "@/app/config/adapters/axiosAdapter";
import { CreateSessionParams } from "@/app/data/interfaces/session";
import { RegisterUserParams } from "@/app/data/interfaces/user";
import { useToast } from "@/app/hooks/useToastContext";

import { CreateSessionService } from "@/app/services/auth/CreateSessionService";
import { CreateUserService } from "@/app/services/auth/CreateUserService";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
}

interface DecodedToken {
  sub: string;
  username: string;
  exp: number;
}

interface LoginParams {
  username: string;
  password: string;
}

interface RegisterParams {
  username: string;
  password: string;
  fullname: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  Login: (params: LoginParams) => Promise<void>;
  Register: (params: RegisterParams) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const axios = new AxiosAdapter();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const { ShowToast } = useToast();

  const Login = useCallback(
    async (params: CreateSessionParams) => {
      await new CreateSessionService(axios).create(params).then((response) => {
        if (response.statusCode === 401) {
          ShowToast("Incorrect user!", "error");
          return;
        }

        if (response.token) {
          setToken(response.token);
          localStorage.setItem("token", response.token);
          Cookies.set("token", response.token, { path: "/", expires: 1 });
          ShowToast("Login successful!", "success");
          router.push("/link-management");
          return;
        }
      });
    },
    [ShowToast, router]
  );

  const Register = useCallback(
    async (params: RegisterUserParams) => {
      await new CreateUserService(axios).create(params).then(() => {
        ShowToast("Register successful!", "success");
        router.push("/login");
      });
    },
    [ShowToast, router]
  );

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    Cookies.remove("token");
    ShowToast("Logout successful!", "success");

    router.push("/login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      const decoded = jwtDecode<DecodedToken>(storedToken);
      setUser({ id: decoded.sub, username: decoded.username });
      setToken(storedToken);
    }
  }, [Login]);

  return (
    <AuthContext.Provider value={{ user, token, Login, Register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
