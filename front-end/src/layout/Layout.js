import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-sm-4 col-md-3 col-lg-3 side-bar">
          <Menu />
        </div>
        <div className="col-sm-8 col-md-9 col-lg-9">
          <Routes />
        </div>

      </div>
    </div>
  );
}

export default Layout;
