import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (cb) => {
    setIsLoggedIn(true);
    cb(); 
  };

  const logout = (cb) => {
    setIsLoggedIn(false);
    cb();
  };

  return (
    <AppContext.Provider value={{ search, setSearch, isLoggedIn, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};
