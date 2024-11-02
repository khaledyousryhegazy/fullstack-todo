"use client";

import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  ReactNode,
  FC,
  useState,
  useEffect,
} from "react";

interface AuthContextType {
  email?: string;
  password?: string;
  userName?: string;
  user: any;
  data: any;
  token: string;
  loginAction: (data: any) => Promise<void>;
  registerAction: (data: any) => Promise<void>;
  logoutAction: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [token, setToken] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Only access localStorage after the component has mounted
    const storedToken = localStorage.getItem("site") || "";
    setToken(storedToken);
  }, []);

  const loginAction = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/users/login",
        data
      );
      if (response.data.success) {
        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem("site", response.data.token);
        router.push("/");
        setData(response.data);
        toast({
          description: "Login Successfully",
        });
      }
    } catch (error) {
      console.log("Error During Login", error);
    }
  };

  const registerAction = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/users/register",
        data
      );
      if (response.data.success) {
        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem("site", response.data.token);
        router.push("/");
        setData(response.data);
        toast({
          description: "Login Successfully",
        });
      }
    } catch (error) {
      console.log("Error During Login", error);
    }
  };

  const logoutAction = () => {
    setUser(null);
    setData(null);
    setToken("");
    localStorage.removeItem("site");
    router.push("/login");
    toast({
      description: "Logout Successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{ token, user, data, loginAction, logoutAction, registerAction }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType | undefined => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
