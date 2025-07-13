import React from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";

// Detect if we're running from file:// or TV simulator
const isFileProtocol = window.location.protocol === "file:";

const CustomRouter = ({ children }) => {
  const Router = isFileProtocol ? HashRouter : BrowserRouter;
  return <Router>{children}</Router>;
};

export default CustomRouter;
