import { useEffect, useState } from "react";
import { AuthData } from "../store/models/authdata";

export const useAuth = () => {
  const [authUserData, setAuthUserData] = useState<AuthData | null>(null);

  useEffect(() => {
    const userData: AuthData = JSON.parse(
      sessionStorage.getItem("authdata") as string
    );

    if (userData == null) {
      window.location.href = "/login";
    } else {
      setAuthUserData(userData);
    }
  }, []);

  return authUserData;
};
