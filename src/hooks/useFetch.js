// src/hooks/useFetch.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  obtenerToken,
  guardarToken,
  obtenerRefreshToken,
  eliminarToken,
} from "@/utils/almacenamiento";

const useFetch = (
  url,
  initialOptions = {},
  dependencies = [],
  useAuthToken = true
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        let headers = {
          ...initialOptions.headers,
          "Content-Type": "application/json",
        };

        if (useAuthToken) {
          const token = obtenerToken("accessToken");
          headers["Authorization"] = `Bearer ${token}`;
          console.info(token)
          console.info('Mensaje desde el useFetch')
        }

        let response = await fetch(url, {
          ...initialOptions,
          headers,
        });

        if (!response.ok) {
          if (response.status === 401 && useAuthToken) {
            const refreshToken = obtenerRefreshToken("refreshToken");
            if (refreshToken) {
              const newTokenResponse = await fetch(
                "/api/v1/auth/refresh-token",
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${refreshToken}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              if (newTokenResponse.ok) {
                const newTokenData = await newTokenResponse.json();
                guardarToken("accessToken", newTokenData.data.accessToken);

                // Reintentar la solicitud original con el nuevo token
                headers[
                  "Authorization"
                ] = `Bearer ${newTokenData.data.accessToken}`;
                response = await fetch(url, {
                  ...initialOptions,
                  headers,
                });

                if (!response.ok) {
                  throw new Error(
                    `Error: ${response.status} ${response.statusText}`
                  );
                }
              } else {
                eliminarToken("accessToken");
                eliminarToken("refreshToken");
                navigate("/login");
                throw new Error("Failed to refresh token");
              }
            } else {
              navigate("/login");
              throw new Error("No refresh token available");
            }
          } else {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};

export default useFetch;