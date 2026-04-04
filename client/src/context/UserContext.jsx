import { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../api/authApi.js";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getUser() {
    try {
      const res = await getCurrentUser();
      console.log(res);
      setUser(res?.data?.user);
    } catch (err) {
      setUser(null);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
