import { Outlet, Link } from "react-router-dom";
import "../styles/layout_sidebar.css";

const LayoutSidebar = () => {
  return (
    <div className="layout-sidebar-wrapper">
      {/* Sidebar */}
      <div className="layout-sidebar-container">
        <nav className="nav-container">
          <Link to="/home">
            <button className="nav-button">Home</button>
          </Link>
          <Link to="/records">
            <button className="nav-button">Records</button>
          </Link>
          <Link to="/form">
            <button className="nav-button">Form</button>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="layout-main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutSidebar;
