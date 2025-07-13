import { useEffect, useState } from "react";

function useAuthRefresh() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function refreshTokens() {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: refreshToken }),
        
          
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      } catch (error) {
        console.error("Failed to refresh tokens:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }

      setLoading(false);
    }

    refreshTokens();
  }, []);

  return loading;
}

export default useAuthRefresh;
