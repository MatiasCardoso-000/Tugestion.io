import {
  loginRequest,
  logoutRequest,
  registerRequest,
  verifyTokenRequest,
} from "../../../api/auth/auth";
import { User } from "../../types/user.types";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";

interface AuthProviderType {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const signUp = async (data: User) => {
    try {
      const response = await registerRequest(data);
      const responseData = await response?.json();

      if (!response?.ok) {
        let errorMessages;

        // Caso 1: Hay un objeto de errores de validación de Zod
        if (responseData.errors) {
          // Aplanamos el objeto de errores en una sola lista de mensajes
          errorMessages = Object.values(responseData.errors).flat();
        }
        // Caso 2: Hay un mensaje de error general
        else if (responseData.message) {
          errorMessages = [responseData.message];
        }
        // Caso 3: Un error inesperado
        else {
          errorMessages = ["Ocurrió un error inesperado al registrarse."];
        }

        setErrors(errorMessages);
        setIsAuthenticated(false);
        return; // Detenemos la ejecución
      }

      // --- Si todo fue exitoso ---
      // Aquí iría tu lógica de éxito, como guardar el token y el usuario
      localStorage.setItem("session_active", "true");
      localStorage.setItem("accessToken", responseData.accessToken);
      setIsAuthenticated(true);
      setUser(responseData.user);
    } catch (error) {
      setErrors(["No se pudo conectar con el servidor."]);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (data: User) => {
    try {
      const response = await loginRequest(data);
      const responseData = await response.json();

      if (!response.ok) {
        let errorMessages;

        // Caso 1: Hay un objeto de errores de validación de Zod
        if (responseData.errors) {
          // Aplanamos el objeto de errores en una sola lista de mensajes
          errorMessages = Object.values(responseData.errors).flat();
        }
        // Caso 2: Hay un mensaje de error general
        else if (responseData.message) {
          errorMessages = [responseData.message];
        }
        // Caso 3: Un error inesperado
        else {
          errorMessages = ["Ocurrió un error inesperado al registrarse."];
        }

        setErrors(errorMessages);
        setIsAuthenticated(false);
        setUser(null);
        return; // Detenemos la ejecución
      }

      // --- Si todo fue exitoso ---
      // Aquí iría tu lógica de éxito, como guardar el token y el usuario
      localStorage.setItem("session_active", "true");
      localStorage.setItem("accessToken", responseData.accessToken);
      setIsAuthenticated(true);
      setUser(responseData.user);
      setIsLoading(false);
    } catch (error) {
      setErrors(["No se pudo conectar con el servidor."]);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await logoutRequest();

    localStorage.removeItem("session_active");
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const sessionActive = localStorage.getItem("session_active");

      if (!sessionActive) {
        setIsLoading(false);
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      try {
        const res = await verifyTokenRequest();
        if (!res.ok) {
          setIsLoading(false);
          setIsAuthenticated(false);
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem("accessToken", data.accessToken);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors([]);
    }, 4000);
    return () => clearInterval(timer);
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signUp,
        signIn,
        logout,
        isAuthenticated,
        errors,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
