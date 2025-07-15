import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useFocusable, FocusContext, setFocus } from "@noriginmedia/norigin-spatial-navigation";

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const backButtonRef = useRef(null);

  // Main page focus
  const { ref, focusKey } = useFocusable({
    focusKey: "USER_DETAIL_PAGE",
    trackChildren: true,
    preferredChildFocusKey: "BACK_BUTTON"
  });

  // Back button focus
  const { ref: backRef, focused: backFocused } = useFocusable({
    focusKey: "BACK_BUTTON",
    isFocusable: true,
    onEnterPress: () => {
      navigate('/users');
    },
  });

  useEffect(() => {
    axios.get(`https://dummyjson.com/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, [id]);

  // Focus the back button when component mounts
  useEffect(() => {
    setTimeout(() => {
      setFocus("BACK_BUTTON");
    }, 100);
  }, []);

  const handleBackClick = () => {
    navigate('/users');
  };

  if (!user) return (
    <div className="min-h-screen bg-white p-6 sm:p-10 flex justify-center items-center">
      <p className="text-lg text-orange-600 font-medium">Loading...</p>
    </div>
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="min-h-screen bg-white p-6 sm:p-10 flex flex-col items-center">
        <div className="w-full max-w-md mb-6">
          <button
            ref={(el) => {
              // backButtonRef.current = el;
              // backRef.current = el;
            }}
            onClick={handleBackClick}
            className={`px-6 py-3 bg-orange-600 text-black font-semibold rounded-lg hover:bg-orange-700 focus:outline-none transition-colors duration-200 ${
              backFocused 
                ? "ring-4 ring-orange-300 bg-orange-700 shadow-xl scale-105 transform border-2 border-b-black" 
                : "focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            }`}
          >
            ← Back to Users
          </button>
        </div>
        
        <div className="w-full max-w-md bg-white rounded-xl shadow-md border-2 border-gray-200 p-6 transition-all duration-300">
          <div className="flex items-center gap-4 mb-6">
            {user.image && (
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName} avatar`}
                className="w-16 h-16 object-cover rounded-full border-2 border-orange-300"
              />
            )}
            <h2 className="text-2xl font-bold text-orange-600">{user.firstName} {user.lastName}</h2>
          </div>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-orange-600">Email:</span> {user.email}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-orange-600">Age:</span> {user.age}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold text-orange-600">Phone:</span> {user.phone}
            </p>
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
}

export default UserDetail;