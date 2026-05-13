import { createContext, useState, useEffect } from "react";

import { getCurrentUser } from "../api/userApi.js";
import { getCsurfToken } from "../api/securityApi.js";

import axiosInstance from "../api/axiosInstance.js";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  async function initializeApp() {
  try {
    // Always fetch CSRF token
    const csrfRes = await getCsurfToken();

    axiosInstance.defaults.headers.common["x-csrf-token"] =
      csrfRes?.data?.csrfToken;

  } catch (err) {
    console.log("CSRF fetch failed", err);
  }

  try {
    const userRes = await getCurrentUser();

    setUser(userRes?.data?.user);

  } catch (err) {
    setUser(null);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        getUser: initializeApp,
      }}
    >
      {!loading && children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
