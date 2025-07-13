import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  useFocusable,
  FocusContext,
  setFocus,
} from "@noriginmedia/norigin-spatial-navigation";
import Header from "../component/Header";
import Footer from "../component/footer";

// Reusable focusable
function Focusable({ onEnterPress, children, focusKey }) {
  const { ref, focused } = useFocusable({ onEnterPress, focusKey });
  return (
    <div ref={ref} tabIndex={-1}>
      {children(focused, { ref })}
    </div>
  );
}

function Login() {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { ref, focusKey } = useFocusable({
    focusKey: "LOGIN_PAGE",
    trackChildren: true,
  });

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    login(() => navigate("/country"));
  };

  useEffect(() => {
    setTimeout(() => {
      setFocus("login-email");
    }, 0);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="flex flex-col min-h-screen bg-black text-white">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-4 text-center">Welcome</h1>
            <p className="text-gray-300 mb-6 text-center">
              Enter any email and password to continue.
            </p>

            <div className="space-y-4">
              <Focusable focusKey="login-email">
                {(focused, { ref }) => (
                  <input
                    ref={ref}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className={`w-full px-4 py-2 rounded bg-black text-white outline-none border ${
                      focused
                        ? "border-blue-500 ring-2 ring-blue-400"
                        : "border-gray-600"
                    }`}
                  />
                )}
              </Focusable>

              <Focusable focusKey="login-password">
                {(focused, { ref }) => (
                  <input
                    ref={ref}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className={`w-full px-4 py-2 rounded bg-black text-white outline-none border ${
                      focused
                        ? "border-blue-500 ring-2 ring-blue-400"
                        : "border-gray-600"
                    }`}
                  />
                )}
              </Focusable>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <Focusable focusKey="login-button" onEnterPress={handleLogin}>
                {(focused, { ref }) => (
                  <button
                    ref={ref}
                    onClick={handleLogin}
                    className={`w-full py-2 rounded text-white transition ${
                      focused ? "bg-blue-700" : "bg-blue-600"
                    }`}
                  >
                    Login
                  </button>
                )}
              </Focusable>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </FocusContext.Provider>
  );
}

export default Login;
