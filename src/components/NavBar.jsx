/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from "prop-types";
import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { Link } from "react-router-dom";
import "../styles/sass/navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ handleLogin, userID, handleLogout }) => {
  const initialState = {
    isActive: false,
  };
  const [isActive, setActive] = useState(initialState.isActive);

  const handleToggleNav = () => {
    if (isActive) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  return (
    <div className="navbar">
      <div
        className="toggle"
        onClick={handleToggleNav}
        onKeyDown={handleToggleNav}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
      <img
        className="logo"
        src="https://mcrcodes.s3.eu-west-2.amazonaws.com/course/surreal-estate/logo.png"
        alt="siteLogo"
      />
      <ul className="links">
        <li className="item">
          <Link className="item" to="/">
            View Properties
          </Link>
        </li>
        {userID ? (
          <li className="item">
            <Link className="item" to="saved-favourites">
              Saved Properties
            </Link>
          </li>
        ) : (
          ""
        )}
        <li className="item">
          <Link className="item" to="add-property">
            Add a Property
          </Link>
        </li>
      </ul>
      <div className="facebook-login">
        {!userID ? (
          <FacebookLogin
            appId="1485792895238619"
            fields="name,email,picture"
            callback={handleLogin}
            icon="fa-facebook"
          />
        ) : (
          <button type="submit" onClick={handleLogout}>
            Sign Out
          </button>
        )}
      </div>
      <div
        className="hiddenNav"
        style={{ display: isActive ? "flex" : "none" }}
      >
        <ul className="links">
          <li className="item">
            <Link className="item" to="/">
              View Properties
            </Link>
          </li>
          {userID ? (
            <li className="item">
              <Link className="item" to="saved-favourites">
                Saved Properties
              </Link>
            </li>
          ) : (
            ""
          )}
          <li className="item">
            <Link className="item" to="add-property">
              Add a Property
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  userID: PropTypes.string.isRequired,
};

export default NavBar;
