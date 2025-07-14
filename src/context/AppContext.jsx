import React, { createContext, useState, useMemo, useCallback } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  console.log("AppProvider rendered");
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback((cb) => {
    setIsLoggedIn(true);
    cb();
  }, []);

  const logout = useCallback((cb) => {
    setIsLoggedIn(false);
    cb();
  }, []);

  const contextValue = useMemo(
    () => ({ search, setSearch, isLoggedIn, login, logout }),
    [search, isLoggedIn]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};