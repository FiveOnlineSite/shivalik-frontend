import React, { useEffect } from "react";
import AdminHeader from "../molecules/AdminHeader";
import AdminSidebar from "../molecules/AdminSidebar";
import { AuthProvider } from "../../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/admin.css";

const AdminLayout = ({ children }) => {
  useEffect(() => {
    const stylesheetId = "line-awesome-admin-css";

    if (document.getElementById(stylesheetId)) {
      return;
    }

    const link = document.createElement("link");
    link.id = stylesheetId;
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css";
    document.head.appendChild(link);
  }, []);

  return (
    <AuthProvider>
      <ToastContainer position="top-right" style={{ marginTop: "70px" }} autoClose={3000} />
      <div>
        <input type="checkbox" id="nav-toggle" name="" />
        <div className="sidebar">
          <AdminSidebar />
        </div>

        <div className="main-content">
          <AdminHeader />
          <main>
            <div className="container">{children}</div>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default AdminLayout;
