// src/api/api.ts

// La URL base de nuestro backend.
export const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

/**
 * Refresca el accessToken usando la cookie httpOnly.
 * Guarda el nuevo token en localStorage.
 * @returns {Promise<string>} El nuevo accessToken.
 */
const refreshToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}/refresh-token`, {
      method: "POST",
      // 'credentials: "include"' es CRUCIAL para que fetch envíe la cookie httpOnly.
      credentials: "include",
    });

    if (!response.ok) {
      // Si el refresco falla, limpiamos el token de localStorage.
      localStorage.removeItem("accessToken");
      throw new Error(
        "La sesión ha expirado. Por favor, inicia sesión de nuevo."
      );
    }

    const { accessToken } = await response.json();
    // Guardamos el nuevo token en localStorage para que esté disponible globalmente.
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    // Si hay un error, nos aseguramos de que no quede ningún token guardado.
    localStorage.removeItem("accessToken");
    throw error;
  }
};

/**
 * Wrapper personalizado para la API fetch que maneja la autenticación y el refresco de tokens.
 * @param {string} url - La ruta del endpoint (ej. '/expenses').
 * @param {RequestInit} options - Las opciones de configuración para fetch.
 * @returns {Promise<Response>} La respuesta de la petición.
 */
const apiFetch = async (url: string, options: RequestInit = {}) => {
  // 1. OBTENEMOS EL TOKEN DE LOCALSTORAGE
  // En lugar de una variable local, leemos el token desde localStorage.
  let accessToken = localStorage.getItem("accessToken");

  // Preparamos las cabeceras por defecto.
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  options.headers = headers;

  // 2. HACEMOS LA PRIMERA PETICIÓN
  let response = await fetch(`${BASE_URL}${url}`, options);

  // 3. SI FALLA POR TOKEN EXPIRADO, INTENTAMOS REFRESCAR
  if (response.status === 401) {
    console.log("Access token expirado. Intentando refrescar...");
    try {
      const newAccessToken = await refreshToken();
      // Actualizamos la cabecera de la petición original con el nuevo token.
      if (options.headers) {
        (options.headers as Record<string, string>)[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
      }

      // Reintentamos la petición original.
      response = await fetch(`${BASE_URL}${url}`, options);
    } catch (error) {
      // Si el refresco falla, propagamos el error para que el AuthContext lo maneje.
      return Promise.reject(error);
    }
  }

  return response;
};

export default apiFetch;
