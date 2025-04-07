import React, { useEffect } from "react";
import useAuthStore from "../store/auth";   
const UserProfile = () => {
  const { user, token } = useAuthStore();

  useEffect(() => {
    console.log("User:", user);
    console.log("Token:", token);
  }, [user, token]);

  return (
    <div>
      <h1>Hello, {user?.fullName}</h1>
      <p>User ID: {user?.id}</p>
      <p>Email: {user?.email}</p>
      <p>Full Name: {user?.fullName}</p>
      <button onClick={() => useAuthStore.getState().logout()}>Logout</button>
    </div>
  );
};

export default UserProfile;
