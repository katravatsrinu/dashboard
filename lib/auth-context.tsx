// lib/auth-context.tsx

"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

// Types
interface User {
  name: string;
  email: string;
  avatar?: string;
  password?: string; // optional
}


interface LoginUser {
  email: string;
  password: string;
}
interface RegisterUser {
  name: string;
  email: string;
  password: string;
}


interface AuthContextType {
  user: User | null;
  login: (userData: LoginUser) => void;
  register: (userData: User) => void;
  logout: () => void;
  updateUser: (updatedUserData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = ({ email, password }: LoginUser) => {
    const stored = localStorage.getItem("registeredUser");
    if (stored) {
      const registeredUser = JSON.parse(stored);
      if (
        registeredUser.email === email &&
        registeredUser.password === password
      ) {
        setUser(registeredUser);
        localStorage.setItem("user", JSON.stringify(registeredUser));
        router.push("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } else {
      alert("No registered user found");
    }
  };

  const register = (userData: User) => {
    localStorage.setItem("registeredUser", JSON.stringify(userData));
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    router.push("/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  const updateUser = (updatedUserData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updatedUserData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
