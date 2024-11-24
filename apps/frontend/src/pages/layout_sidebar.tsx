import { Outlet, Link } from "react-router-dom";

const layout_sidebar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/records">Records</Link>
          </li>
          <li>
            <Link to="/form">Form</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default layout_sidebar;
