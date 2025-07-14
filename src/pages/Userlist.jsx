import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFocusable, FocusContext, setFocus } from "@noriginmedia/norigin-spatial-navigation";
import Header from "../component/Header";
import Footer from "../component/footer";

// Reusable Focusable wrapper
function Focusable({ onEnterPress, children, focusKey, onClick, isFirstItem = false }) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    focusKey,
    onClick,
    onArrowPress: ({ direction }) => {
      if (direction === "up" && isFirstItem) {
        // If this is the first item and user presses up, go back to header
        setFocus("nav-logout"); // Focus on the last header item
        return true;
      }
      return false;
    },
  });

  return (
    <div ref={ref} tabIndex={-1} onClick={onClick}>
      {children(focused, { ref })}
    </div>
  );
}

// Simple list container without focus management
function FocusableList({ children }) {
  return (
    <ul className="grid gap-3" style={{ outline: "none" }}>
      {children}
    </ul>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const { ref, focusKey } = useFocusable({ 
    focusKey: "USER_PAGE", 
    trackChildren: true,
    preferredChildFocusKey: "header-nav"
  });

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Set initial focus to header navigation
  useEffect(() => {
    setTimeout(() => {
      setFocus("header-nav");
    }, 300);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className="p-4 min-h-screen bg-black text-white flex flex-col gap-4"
      >
        <Header />
        <h1 className="text-2xl font-bold mb-4">Users</h1>

        <FocusableList>
          {users.map((user, index) => {
            const goToDetail = () => navigate(`/user/${user.id}`);

            return (
              <Focusable
                key={user.id}
                focusKey={`user-${user.id}`}
                onEnterPress={goToDetail}
                onClick={goToDetail}
                isFirstItem={index === 0}
              >
                {(focused, { ref }) => (
                  <li
                    ref={ref}
                    data-focus-key={`user-${user.id}`}
                    className={`p-3 rounded border cursor-pointer transition border-2 ${
                      focused
                        ? "border-blue-500 ring-2 ring-blue-400 bg-gray-700"
                        : "border-gray-600 hover:border-blue-500 hover:bg-gray-700"
                    }`}
                  >
                    {user.firstName} {user.lastName}
                  </li>
                )}
              </Focusable>
            );
          })}
        </FocusableList>
        
        <Footer />
      </div>
    </FocusContext.Provider>
  );
}

export default UserList;