import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("pendingUsername");

  const handleChangePassword = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/change-password", {
        username,
        newPassword,
      });
      localStorage.removeItem("pendingUsername");
      alert("Password changed successfully, please login again");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Change Password</h1>
      <input
        className="border p-2 w-full mb-2"
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button
        className="bg-yellow-500 text-white p-2 w-full"
        onClick={handleChangePassword}
      >
        Change Password
      </button>
    </div>
  );
}
