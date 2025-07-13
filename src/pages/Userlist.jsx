import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFocusable, FocusContext } from "@noriginmedia/norigin-spatial-navigation";
import Header from "../component/Header";
import { AppContext } from "../context/AppContext";

// Reusable Focusable wrapper
function Focusable({ onEnterPress, children, focusKey, onClick }) {
  const { ref, focused } = useFocusable({ onEnterPress, focusKey });
  return (
    <div ref={ref} tabIndex={-1} onClick={onClick}>
      {children(focused, { ref })}
    </div>
  );
}

function FocusableList({ children }) {
  const { ref } = useFocusable({
    focusKey: "user-list",
    trackChildren: true,
    autoRestoreFocus: true,
  });

  return (
    <ul ref={ref} className="grid gap-3" style={{ outline: "none" }}>
      {children}
    </ul>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { ref, focusKey } = useFocusable({ focusKey: "USER_PAGE", trackChildren: true });

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="p-4 min-h-screen bg-black text-white">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Users</h1>

        <FocusableList>
          {users.map((user) => {
            const goToDetail = () => navigate(`/user/${user.id}`);

            return (
              <Focusable
                key={user.id}
                focusKey={`user-${user.id}`}
                onEnterPress={goToDetail}
                onClick={goToDetail}
              >
                {(focused, { ref }) => (
                  <li
                    ref={ref}
                    className={`p-3 rounded border cursor-pointer transition ${
                      focused ? "border-blue-500 bg-gray-700" : "border-gray-600"
                    }`}
                  >
                    {user.firstName} {user.lastName}
                  </li>
                )}
              </Focusable>
            );
          })}
        </FocusableList>
      </div>
    </FocusContext.Provider>
  );
}

export default UserList;
