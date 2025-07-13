import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  useFocusable,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";

// Reusable focusable wrapper
function Focusable({ onEnterPress, children, focusKey, onClick }) {
  const { ref, focused } = useFocusable({ onEnterPress, focusKey });
  return (
    <div ref={ref} tabIndex={-1} onClick={onClick}>
      {children(focused, { ref })}
    </div>
  );
}

function Header() {
  const { isLoggedIn, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const { ref, focusKey } = useFocusable({
    focusKey: "header-nav",
    preferredChildFocusKey: "nav-country",
  });

  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Country & User App</h1>
      {isLoggedIn && (
        <FocusContext.Provider value={focusKey}>
          <nav ref={ref} className="flex gap-4">
            <Focusable onEnterPress={() => navigate("/country")} focusKey="nav-country">
              {(focused, { ref }) => (
                <button
                  ref={ref}
                  onClick={() => navigate("/country")}
                  className={`cursor-pointer px-3 py-1 rounded ${
                    focused ? "underline text-blue-400" : ""
                  }`}
                >
                  Countries
                </button>
              )}
            </Focusable>

            <Focusable onEnterPress={() => navigate("/users")} focusKey="nav-users">
              {(focused, { ref }) => (
                <button
                  ref={ref}
                  onClick={() => navigate("/users")}
                  className={`cursor-pointer px-3 py-1 rounded ${
                    focused ? "underline text-blue-400" : ""
                  }`}
                >
                  Users
                </button>
              )}
            </Focusable>

            <Focusable onEnterPress={() => logout(() => navigate("/"))} focusKey="nav-logout">
              {(focused, { ref }) => (
                <button
                  ref={ref}
                  onClick={() => logout(() => navigate("/"))}
                  className={`px-3 py-1 rounded ${
                    focused ? "bg-red-600" : "bg-red-500"
                  }`}
                >
                  Logout
                </button>
              )}
            </Focusable>
          </nav>
        </FocusContext.Provider>
      )}
    </header>
  );
}

export default Header;
