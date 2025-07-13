import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!user) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
}

export default UserDetail;
