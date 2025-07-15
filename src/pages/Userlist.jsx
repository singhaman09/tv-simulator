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

function FocusableList({ children }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 w-full px-4" style={{ outline: "none" }}>
      {children}
    </ul>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
    const [loading, setLoading] = useState(true); 

  const { ref, focusKey } = useFocusable({ 
    focusKey: "USER_PAGE", 
    trackChildren: true,
    preferredChildFocusKey: "header-nav"
  });

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((res) => {setUsers(res.data.users) 
      setLoading(false);}
    )
      .catch((err) => {console.error("Error fetching users:", err)
       setLoading(false);});
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFocus("header-nav");
    }, 300);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className="bg-white min-h-screen text-orange-600 flex flex-col gap-6"
      >
        <Header />
        {/* <h1 className="text-2xl font-bold text-orange-600 mb-4">Users</h1> */}
 <main className="flex-grow flex items-center justify-center p-6">
          {loading ? (
            <div className="text-xl font-bold text-black animate-pulse">
  Loading users...
</div>

          ) : (
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
                    className={`p-4 rounded-xl bg-white shadow-md border-2 cursor-pointer transition-all duration-300 transform hover:scale-105
                      ${focused
                        ? "border-orange-500 ring-4 ring-orange-300 bg-gradient-to-r from-orange-50 to-gray-50 shadow-xl scale-105"
                        : "border-gray-200 hover:border-orange-400 hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      {user.image && (
                        <img
                          src={user.image}
                          alt={`${user.firstName} ${user.lastName} avatar`}
                          className="w-12 h-8 object-cover rounded"
                        />
                      )}
                      <span className="text-lg font-semibold text-orange-600">
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                  </li>
                )}
              </Focusable>
            );
          })}
        </FocusableList>)}
        </main>
        <Footer />
      </div>
    </FocusContext.Provider>
  );
}

export default UserList;