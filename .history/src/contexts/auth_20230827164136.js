import { createContext, useEffect, useState } from "react";
import { api, createSession } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pesquisaTeste, setPesquisaTeste] = useState("Biblioteca");

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      setUser(JSON.parse(user));
      api.defaults.headers.authorization = `Bearer ${token}`;
      console.log("useEffect recuperou o login")
    }

  }, []);

  const login = async (email, password) => {

    const response = await createSession(email, password);

    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);

    api.defaults.headers.authorization = `Bearer ${response.data.token}`;

    setUser(response.data.user);
    console.log(response.data.token);

    console.log("veio pro login");

  }

  const logout = async () => {
    console.log('veio pro logout')
    localStorage.removeItem('user');
    localStorage.removeItem("token");
    localStorage.clear()


    api.defaults.headers.authorization = null;
    setUser(null);
  }



  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        login,
        logout,
        pesquisaTeste,
        setPesquisaTeste,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
