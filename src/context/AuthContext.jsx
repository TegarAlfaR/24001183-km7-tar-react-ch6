import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect, useContext } from "react";
import { isTokenExpired } from "../../Utils/auth.js";

import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setIsAuthenticated(false);
      navigate("/login");
    }
    setIsAuthenticated(!!token);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      console.log(response);

      const token = response.data.data.token;
      console.log(token);
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      setUser(jwtDecode(token));
      navigate("/");
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
    
  };

  const logout = (token) => {
    localStorage.removeItem("token", token);
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("error in useAuth function");
  }
  return context;
};

export default AuthProvider;
