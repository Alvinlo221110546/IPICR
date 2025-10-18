import React from "react";
import { logout } from "../Utils/api.js";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gray-100 text-black border border-gray-300 px-5 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition-all duration-200"
      style={{
        marginRight: "40px",
        fontSize: "15px",
        fontWeight: "500",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "90px",
        marginRight: "90px"
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
