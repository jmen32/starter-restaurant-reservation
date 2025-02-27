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
      <div className="row">
        <div className="col-sm-4 col-md-3 col-lg-2 side-bar">
          <Menu />
        </div>
        <div className="col-sm-8 col-md-9 col-lg-10">
          <Routes />
        </div>

      </div>
    </div>
  );
}

export default Layout;
