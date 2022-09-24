//import dependencies and associated files
import React from "react";
import "../styles/header.scss";
//importing our procuts component
import Products from "./Products";
//function to create a home component
function Home() {
  return (
    <>
      <div className="header">
        <div className="header-content">
          <h1>Welcome to Nouvu Shop</h1>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </span>
        </div>
      </div>
      <Products />
    </>
  );
}
//export the home component
export default Home;
