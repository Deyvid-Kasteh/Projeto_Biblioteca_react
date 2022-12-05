import { createContext, useEffect, useState } from "react";
import { createSession } from "../services/api";

export const AuthContext = createContext();

export const AuthProvier = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
          setUser(JSON.parse(user));
    }

  }, []);

  const login = async (email, password) => {
    const response = await createSession(email, password);

    localStorage.setItem('user', JSON.stringify(response.data.user));

    setUser(response.data.user);
  }

  const logout = async () => {
    setUser(null);
  }



  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
