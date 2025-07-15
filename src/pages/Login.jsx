import React, { useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  useFocusable,
  FocusContext,
  setFocus,
  doesFocusableExist,
} from "@noriginmedia/norigin-spatial-navigation";
import Header from "../component/Header";
import Footer from "../component/footer";

// Custom Focusable wrapper
const Focusable = React.memo(({ focusKey, onEnterPress, children }) => {
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress,
    onArrowPress: () => true,
  });

  useEffect(() => {
    if (focused && (focusKey === "login-email" || focusKey === "login-password")) {
      setTimeout(() => {
        if (ref.current) {
          ref.current.focus();
          if (typeof window.webOS !== "undefined" && window.webOS?.keyboard) {
            window.webOS.keyboard.show();
          }
        }
      }, 50);
    }
  }, [focused, focusKey, ref]);

  return (
    <div ref={ref} tabIndex={-1}>
      {children(focused, { ref })}
    </div>
  );
});

function Login() {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleLogin = useCallback(() => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    login(() => navigate("/country"));
  }, [email, password, login, navigate]);

  const { ref, focusKey } = useFocusable({
    focusKey: "LOGIN_PAGE",
    trackChildren: true,
    preferredChildFocusKey: "login-email",
  });

  useEffect(() => {
    setTimeout(() => {
      if (doesFocusableExist("login-email")) {
        setFocus("login-email");
      }
    }, 300);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className=" bg-white flex flex-col min-h-screen text-orange-600 relative">
        <Header />
        <main className="flex-grow flex items-center justify-center p-6 sm:p-10 mt-16"> {/* Added mt-16 to account for fixed header */}
          <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-8 transform hover:scale-[1.02] transition-transform duration-300">
            <h1 className="text-4xl font-extrabold text-center text-orange-600 bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 animate-pulse">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-center text-lg font-medium">
              Sign in to continue your journey.
            </p>

            {/* Email Input */}
            <Focusable
              focusKey="login-email"
              onEnterPress={() => {
                if (!email.trim()) {
                  const input = document.getElementById("loginEmailInput");
                  if (input) {
                    input.focus();
                    if (typeof window.webOS !== "undefined" && window.webOS?.keyboard) {
                      window.webOS.keyboard.show();
                    }
                  }
                } else {
                  setFocus("login-password");
                }
              }}
            >
              {(focused, { ref }) => (
                <div className="relative">
                  <input
                    ref={ref}
                    id="loginEmailInput"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    inputMode="email"
                    className={`w-full px-6 py-4 rounded-xl bg-gray-50 text-gray-900 border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300 ${
                      focused ? "border-orange-500 shadow-xl scale-105" : "border-gray-200"
                    } hover:border-orange-400 hover:bg-gray-100 text-lg font-medium placeholder-gray-400`}
                  />
                  <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                </div>
              )}
            </Focusable>

            {/* Password Input */}
            <Focusable
              focusKey="login-password"
              onEnterPress={() => {
                if (!password.trim()) {
                  const input = document.getElementById("loginPasswordInput");
                  if (input) {
                    input.focus();
                    if (typeof window.webOS !== "undefined" && window.webOS?.keyboard) {
                      window.webOS.keyboard.show();
                    }
                  }
                } else {
                  setFocus("login-button");
                }
              }}
            >
              {(focused, { ref }) => (
                <div className="relative">
                  <input
                    ref={ref}
                    id="loginPasswordInput"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    inputMode="text"
                    className={`w-full px-6 py-4 rounded-xl bg-gray-50 text-gray-900 border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300 ${
                      focused ? "border-orange-500 shadow-xl scale-105" : "border-gray-200"
                    } hover:border-orange-400 hover:bg-gray-100 text-lg font-medium placeholder-gray-400`}
                  />
                  <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m-4-4c0-1.1-.9-2-2-2s-2 .9-2 2 2 4 2 4m6-6h4m-12 0H4m8 8v4m0-16v4" />
                    </svg>
                  </span>
                </div>
              )}
            </Focusable>

            {error && (
              <p className="text-red-500 text-lg font-medium text-center animate-bounce bg-red-100 rounded-lg p-2">
                {error}
              </p>
            )}

            {/* Login Button */}
            <Focusable focusKey="login-button" onEnterPress={handleLogin}>
              {(focused, { ref }) => (
                <button
                  ref={ref}
                  onClick={handleLogin}
                  type="button"
                  className={`w-full py-4 rounded-xl text-black font-bold text-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-orange-500 to-red-500 ${
                    focused ? "shadow-2xl ring-4 ring-orange-300 scale-105" : "shadow-md"
                  } hover:from-orange-600 hover:to-red-600`}
                >
                  Sign In
                </button>
              )}
            </Focusable>
          </div>
        </main>
        <Footer />
      </div>
    </FocusContext.Provider>
  );
}

export default React.memo(Login);