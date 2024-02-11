import React, { createContext, useState, useContext, ReactNode } from "react";
import connector from "./connect";

interface User {
  id: string;
  username: string;
  password: String;
}

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const resposne = await connector.post("/user/login", {
        username,
        password,
      });
      setUser(resposne.data);
    } catch (error) {
      console.error("error during login", error);
      throw error;
    }
  };

  const signup = async (username: string, password: string) => {
    try {
      const resposne = await connector.post("/user/createuser", {
        username,
        password,
      });

      setUser(resposne.data);
    } catch (error) {
      console.error("error while signup", error);
      throw error;
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
